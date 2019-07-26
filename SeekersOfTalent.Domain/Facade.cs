using SeekersOfTalent.Data.SotEntities;
using SeekersOfTalent.Domain.Infrastructure;

namespace SeekersOfTalent.Domain
{
    public class Facade : SotServiceBase, IFacade
    {

        public Facade(SotContext context)
        {
            Context = context;
        }

    }
}
