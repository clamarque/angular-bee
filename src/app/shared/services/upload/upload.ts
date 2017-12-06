export class Upload {
  $key: string;
  name: string;
  file: any;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file) {
    let data = [];

    data.push({
      name: file.name,
      lastModifiedDate: file.lastModifiedDate,
      type: file.type,
      size: file.size
    })
    console.log('data', data)
   
    this.file = file;
  }
}

