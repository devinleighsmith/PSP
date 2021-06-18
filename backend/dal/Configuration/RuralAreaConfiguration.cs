using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pims.Dal.Entities;

namespace Pims.Dal.Configuration
{
    /// <summary>
    /// RuralAreaConfiguration class, provides a way to configure purposes in the database.
    ///</summary>
    public class RuralAreaConfiguration : LookupEntityConfiguration<RuralArea, int>
    {
        #region Methods
        public override void Configure(EntityTypeBuilder<RuralArea> builder)
        {
            builder.ToTable("RuralAreas");

            builder.HasKey(m => m.Id);
            builder.Property(m => m.Id).IsRequired();
            builder.Property(m => m.Id).ValueGeneratedNever();

            builder.Property(m => m.Name).IsRequired();
            builder.Property(m => m.Name).HasMaxLength(150);

            builder.HasIndex(m => new { m.Name }).IsUnique();
            builder.HasIndex(m => new { m.IsDisabled, m.Name });

            base.Configure(builder);
        }
        #endregion
    }
}
