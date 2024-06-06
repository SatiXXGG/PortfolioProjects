export interface anime {
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  titles: [
    {
      type: string;
      title: string;
    }
  ];
  title: string;
  episodes: number;
  year: number;
  genres: [
    {
      name: string;
    }
  ];
}
