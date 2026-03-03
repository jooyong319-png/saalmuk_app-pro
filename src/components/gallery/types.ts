// ===== 갤러리 아이템 =====
export interface GalleryItemData {
  id: number;
  icon: string;
  name: string;
  desc: string;
  description?: string;
  color: string;
}

// ===== 카테고리 =====
export interface GalleryCategory {
  title: string;
  items: GalleryItemData[];
}
