using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Pims.Dal.Entities;

namespace Pims.Dal.Configuration
{
    /// <summary>
    /// MotiClassificationConfiguration class, provides a way to configure property classifications in the database.
    ///</summary>
    public class MotiClassificationConfiguration : LookupEntityConfiguration<MotiClassification, int>
    {
        #region Methods
        public override void Configure(EntityTypeBuilder<MotiClassification> builder)
        {
            builder.ToTable("MotiClassifications");

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
