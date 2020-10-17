using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using api.Database;
using api.Dtos;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/orphanages")]
    [ApiController]
    public class OrphanagesController : ControllerBase
    {
        private readonly IOrphanageRepository _orphanageRepository;
        private readonly IMapper _mapper;
        public OrphanagesController(IOrphanageRepository orphanageRepository, IMapper mapper)
        {
            _orphanageRepository = orphanageRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(_mapper.Map<IEnumerable<OrphanageDto>>((await _orphanageRepository.GetAllOrphanages())));
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(_mapper.Map<OrphanageDto>(await _orphanageRepository.GetOrphanageById(Id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrphanage()
        {
            CultureInfo culture = new CultureInfo("en-US");
            
            var orphanageDto = new OrphanageDto() 
            {
                Name = Request.Form["Name"],
                Latitude = Convert.ToDecimal(Request.Form["Latitude"], culture),
                Longitude = Convert.ToDecimal(Request.Form["Longitude"], culture),
                About = Request.Form["About"],
                Instructions = Request.Form["Instructions"],
                OpenningHours = Request.Form["OpenningHours"],
                OpenOnWeekends = Convert.ToBoolean(Request.Form["OpenOnWeekends"])
            };

            if (orphanageDto == null)
                return BadRequest(nameof(orphanageDto));

            var orphanage = _orphanageRepository.CreateOrphanage(_mapper.Map<Orphanage>(orphanageDto));

            if (await _orphanageRepository.SaveChangesAsync())
            {
                await Upload(orphanage.Id, Request.Form.Files);

                return Created("", _mapper.Map<OrphanageDto>(orphanage));
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrphanage(int id)
        {
            var orphanage = await _orphanageRepository.GetOrphanageById(id);
                
            if (orphanage == null)
                return NotFound();

            _orphanageRepository.DeleteOrphanage(orphanage);

            if (await _orphanageRepository.SaveChangesAsync())
                return Ok();

            return BadRequest();
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(int orphanageId, IFormFileCollection Files)
        {
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (Files == null)
                return BadRequest();

            foreach (var file in Files)
            {
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, fileName.Replace("\"", " ").Trim());

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    _orphanageRepository.CreateImage(
                        new OrphanageImage { 
                            OrphanageId = orphanageId,
                            Path = fileName.Replace("\"", " ").Trim()
                        }
                    );
                }
            }

            if (await _orphanageRepository.SaveChangesAsync())
                return Ok();

            return BadRequest();
        }
    }
}