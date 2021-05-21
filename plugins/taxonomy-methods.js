// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------

// ///////////////////////////////////////////////////////////////////// Exports
// -----------------------------------------------------------------------------
export default ({ store, app }, inject) => {
  // /////////////////////////////////////////////////////////// Check Category Exists
  inject('checkTaxonomyCategoryExists', (slug) => {
    const category = _getTaxonomyCategory(slug)
    return category !== null
  })

  // /////////////////////////////////////////////////////////// Get Category
  inject('getTaxonomyCategory', (slug) => {
    const category = _getTaxonomyCategory(slug)
    return category || {}
  })

  // /////////////////////////////////////////////////////////// Get Category Label
  inject('getTaxonomyCategoryLabel', (slug) => {
    const category = _getTaxonomyCategory(slug)
    return category ? category.label : ''
  })

  // /////////////////////////////////////////////////////////// Get Tags by Category
  inject('getTaxonomyTagsByCategory', (slug) => {
    const category = _getTaxonomyCategory(slug)
    return category ? category.tags : []
  })

  // /////////////////////////////////////////////////////////// Check Tag Exists
  inject('checkTaxonomyTagExists', (categorySlug, tagSlug) => {
    const tag = _getTaxonomyTag(categorySlug, tagSlug)
    return tag !== null
  })

  // /////////////////////////////////////////////////////////// Get Tag
  inject('getTaxonomyTag', (categorySlug, tagSlug) => {
    const tag = _getTaxonomyTag(categorySlug, tagSlug)
    return tag || {}
  })

  // /////////////////////////////////////////////////////////// Get Tag Label
  inject('getTaxonomyTagLabel', (categorySlug, tagSlug) => {
    const tag = _getTaxonomyTag(categorySlug, tagSlug)
    return tag ? tag.label : ''
  })

  function _getTaxonomyCategory (slug) {
    const siteContent = store.getters['global/siteContent']
    const categories = (siteContent.taxonomy && siteContent.taxonomy.categories) || []
    const category = categories.filter(category => category.slug === slug)
    return category.length ? category[0] : null
  }

  function _getTaxonomyTag (categorySlug, tagSlug) {
    const category = _getTaxonomyCategory(categorySlug)
    if (!category) { return null }
    const tag = category.tags.filter(tag => tag.slug === tagSlug)
    return tag.length ? tag[0] : null
  }
}
