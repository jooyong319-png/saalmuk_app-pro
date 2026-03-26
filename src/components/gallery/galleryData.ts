// community/galleryData.ts에서 모든 것을 re-export
export {
  galleryTabs,
  galleryCategories,
  galleries,
  getGalleryById,
  getGalleriesByCategory,
  getAllGalleries,
  toInterestChannel,
  searchGalleries,
  getGalleryIdByName,
} from "../community/galleryData";

export type { GalleryData, GalleryCategory, GalleryItemData } from "../community/galleryData";