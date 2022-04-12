const e = require("express");
const express = require("express");
const router = express.Router();
const { categoryList, addCategory, modifyCategory, deleteCategory, listBanners, addBanner, modifyBanner, deleteBanner, deleteBook, modifyBook, addBook, listBooks, listPromoCodes, addPromoCode, modifyPromoCode, deletePromoCode } = require("../handlers/adminHandler");
const { Book } = require("../model/bookModel");

//////////////////////////////////////////////////////////////////////////DashBoard Routes//////////////////////////////////////////////////////////////////////////
//What is 'Books':int in Admin Dashboard?

router.get("/totalEarning", (req, res) => {

});

router.get("/totalBooksSold", (req, res) => {

});

router.get("/totalOrdersPlaced", (req, res) => {

});

//////////////////////////////////////////////////////////////////////////Book Routes//////////////////////////////////////////////////////////////////////////

//TODO: BulkHead functionality
router.get("/bookList", listBooks);

router.post("/addBook", addBook);

router.post("/modifyBook", modifyBook);

router.delete("/deleteBook", deleteBook);

//////////////////////////////////////////////////////////////////////////Category Routes//////////////////////////////////////////////////////////////////////////

router.get("/categoryList", categoryList);

router.post("/addCategory", addCategory);

router.post("/modifyCategory", modifyCategory);

router.delete("/deleteCategory", deleteCategory);

//////////////////////////////////////////////////////////////////////////Banner Routes//////////////////////////////////////////////////////////////////////////

router.get("/bannerList", listBanners);

router.post("/addBanner", addBanner);

router.post("/modifyBanner", modifyBanner);

router.delete("/deleteBanner", deleteBanner);

//////////////////////////////////////////////////////////////////////////Promo Codes Routes//////////////////////////////////////////////////////////////////////////

router.get("/promoCodeList", listPromoCodes);

router.post("/addPromoCode", addPromoCode);

router.post("/modifyPromoCode", modifyPromoCode);

router.delete("/deletePromoCode", deletePromoCode);


module.exports = router;