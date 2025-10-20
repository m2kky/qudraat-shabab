/**
 * تحويل النص إلى slug مناسب للـ URLs
 * @param {string} title - النص المراد تحويله
 * @returns {string} - الـ slug المحول
 */
export const slugify = (title) => {
  if (!title) return '';
  
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')           // استبدال المسافات بشرطات
    .replace(/[^\u0600-\u06FF\w-]/g, '') // إزالة الرموز الخاصة (احتفاظ بالعربية والإنجليزية)
    .replace(/-+/g, '-')            // استبدال الشرطات المتعددة بشرطة واحدة
    .replace(/^-|-$/g, '');         // إزالة الشرطات من البداية والنهاية
};

/**
 * إنشاء slug فريد من العنوان مع إضافة رقم إذا لزم الأمر
 * @param {string} title - العنوان
 * @param {Array} existingSlugs - قائمة الـ slugs الموجودة
 * @returns {string} - الـ slug الفريد
 */
export const createUniqueSlug = (title, existingSlugs = []) => {
  let baseSlug = slugify(title);
  let uniqueSlug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
};

/**
 * التحقق من صحة الـ slug
 * @param {string} slug - الـ slug المراد التحقق منه
 * @returns {boolean} - true إذا كان الـ slug صحيح
 */
export const isValidSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return false;
  
  // يجب أن يحتوي على أحرف أو أرقام أو شرطات فقط
  const slugRegex = /^[\u0600-\u06FF\w-]+$/;
  return slugRegex.test(slug) && slug.length > 0;
};
