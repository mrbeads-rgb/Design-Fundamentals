
export interface Section {
  id: string;
  title: string;
}

export interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}

export interface Part {
  id: string;
  title: string;
  chapters: Chapter[];
}
