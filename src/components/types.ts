

export interface Category {
    id: number;
    name: string;
  }
  
export interface Tag {
    id: number;
    name: string;
  }
  
export interface Post {
    id: number;
    title: string;
    content: string;
    image_url: string; 
    categories: Category[];
    tags: Tag[];
    created_at: string;
    updated_at: string;
  }
  