import {Images} from '../database'
import { calculateLimitAndOffset, paginate } from "paginate-info";


class imagesController {
  static async search(req, res) {
    try {
      const { image } = req.params;
      const { currentPage = 1, pageSize = 10 } = req.query;
      const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize);
      let images = await Images.where("categories", "==", image).get();

      if (images.empty) {
        return res.status(401).json({
          status: 401,
          message: "we don't have image you are looking",
        });
      }
      images.forEach((docs) => {
        images = docs.data();
      });
      
      const count = Object.keys(images).length;
      // const paginatedData = Object.entries(images).slice(
      //   offset,
      //   offset + limit
      // );
     let paginatedData = await Images
       .where("categories", ">=", image)
       .orderBy("categories")
       .startAt(offset)
       .limit(limit)
       .get();
      paginatedData.forEach((docs)=>{
        paginatedData = docs.data();
      })
      const paginationInfo = paginate(currentPage, count, paginatedData);

      
      return res.status(200).json({
        message: "image found successfully",
        success: true,
        data: {
          paginatedData,
        },
        pagination: {
          paginationInfo,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error!",
      });
    }
  }

  
}
export default imagesController