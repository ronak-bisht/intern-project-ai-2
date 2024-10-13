export default function formatBlogName(blogName:string) {
    return blogName
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
  }
  