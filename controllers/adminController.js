const express = require("express");
const router = express.Router();
const { categoryList, addCategory, modifyCategory, deleteCategory, listBanners, addBanner, modifyBanner, deleteBanner, deleteBook, modifyBook, addBook, listBooks, listPromoCodes, addPromoCode, modifyPromoCode, deletePromoCode, addNewArrival, deleteNewArrival, listNewArrivals, addFeaturedProduct, deleteFeaturedProduct, listFeaturedProducts, addOnSale, deleteOnSale, listOnSales, addBestSeller, deleteBestSeller, listBestSellers } = require("../handlers/adminHandler");

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

router.patch("/modifyBook", modifyBook);

router.delete("/deleteBook", deleteBook);

//////////////////////////////////////////////////////////////////////////Category Routes//////////////////////////////////////////////////////////////////////////

router.get("/categoryList", categoryList);

router.post("/addCategory", addCategory);

router.patch("/modifyCategory", modifyCategory);

router.delete("/deleteCategory", deleteCategory);

//////////////////////////////////////////////////////////////////////////Banner Routes//////////////////////////////////////////////////////////////////////////

router.get("/bannerList", listBanners);

router.post("/addBanner", addBanner);

router.patch("/modifyBanner", modifyBanner);

router.delete("/deleteBanner", deleteBanner);

//////////////////////////////////////////////////////////////////////////Promo Codes Routes//////////////////////////////////////////////////////////////////////////

router.get("/promoCodeList", listPromoCodes);

router.post("/addPromoCode", addPromoCode);

router.patch("/modifyPromoCode", modifyPromoCode);

router.delete("/deletePromoCode", deletePromoCode);

//////////////////////////////////////////////////////////////////////////Home Page Action  Routes//////////////////////////////////////////////////////////////////////////

router.post("/addNewArrival", addNewArrival);
router.delete("/deleteNewArrival", deleteNewArrival);
router.get("/newArrivalList", listNewArrivals);


router.post("/addFeaturedProduct", addFeaturedProduct);
router.delete("/deleteFeaturedProduct", deleteFeaturedProduct);
router.get("/featuredProductList", listFeaturedProducts);

router.post("/addOnSale", addOnSale);
router.delete("/deleteOnSale", deleteOnSale);
router.get("/onSaleList", listOnSales);

router.post("/addBestSeller", addBestSeller);
router.delete("/deleteBestSeller", deleteBestSeller);
router.get("/bestSellerList", listBestSellers);


module.exports = router;