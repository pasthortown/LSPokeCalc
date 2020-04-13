export class ProfilePicture {
   id: number;
   file_type: String;
   file_name: String;
   file: String;

   constructor() {
      this.id = 0;
      this.file = '';
      this.file_name = '';
      this.file_type = '';
   }
}