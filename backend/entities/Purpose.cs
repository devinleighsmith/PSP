namespace Pims.Dal.Entities
{
    /// <summary>
    /// Purpose class, provides an entity for the datamodel to manage a list of property classifications.
    /// </summary>
    public class Purpose : LookupEntity<int>
    {
        #region Properties
        /// <summary>
        /// get/set - Whether this purpose is generally visible.
        /// </summary>
        public bool IsVisible { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Create a new instance of a Purpose class.
        /// </summary>
        public Purpose() { }

        /// <summary>
        /// Create a new instance of a Purpose class.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        public Purpose(int id, string name, bool isVisible = true) : base(id, name)
        {
            this.IsVisible = isVisible;
        }
        #endregion
    }
}
