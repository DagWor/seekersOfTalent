using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Domain;
using SeekersOfTalent.Domain.Services;
using System;

namespace SeekersOfTalent.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.Name = ".ASPNetCoreSession";
                options.Cookie.Path = "/";
            });

            services.AddAntiforgery(opts =>
            {
                opts.Cookie.Name = ".ASPNetCoreSession";
                opts.Cookie.Path = "/";
            });



            services.AddCors();

            var _sotConnection = Configuration.GetConnectionString("SOTConnection");
            services.AddDbContext<SotContext>(
                option => option.UseNpgsql(_sotConnection));

            InitTransient(services);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        public void InitTransient(IServiceCollection services)
        {
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IFacade, Facade>();
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            var origins = this.Configuration.GetSection("API_Origins").Get<String[]>();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.UseStaticFiles();
            var o = app.UseCors(builder => builder
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .AllowCredentials()
                // .AllowAnyOrigin());
                .WithOrigins(origins));
            app.UseSession();
            app.UseMvc();
        }
    }
}
