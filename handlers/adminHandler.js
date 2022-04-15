const { Category } = require("../model/AdminModels/categoryModel");
const { Banner } = require("../model/AdminModels/bannerModel");
const { PromoCode } = require("../model/AdminModels/promoCodeModel");
const { Book } = require("../model/AdminModels/bookModel");
const { NewArrival } = require("../model/AdminModels/HomePageActionModels/newArrivalModel");
const { OnSale } = require("../model/AdminModels/HomePageActionModels/onSaleModel");
const { FeaturedProduct } = require("../model/AdminModels/HomePageActionModels/featuredProductModel");
const { BestSeller } = require("../model/AdminModels/HomePageActionModels/bestSellerModel");
const db = require("../model/dbConnection");
const { deleteImage } = require("../middlewares/imageMiddleware");

//////////////////////////////////////////////////////////////////////////Category Routes//////////////////////////////////////////////////////////////////////////

const categoryList = (req, res) => {
    Category.find((err, docs) => {
        if (err)
            res.status(500).json(err);
        else
            res.json(docs);
    })
};

const addCategory = (req, res) => {
    const categoryName = req.body.category;
    const categoryDiscount = req.body.discount;
    const categoryShow = req.body.showOnHome;
    const newCategory = new Category({
        category: categoryName,
        discount: categoryDiscount,
        showOnHome: categoryShow,
    });
    newCategory.save().then((category) => {
        res.json({ category });
    }).catch((err) => {
        res.status(409).json(err);
    });
};

const modifyCategory = (req, res) => {
    const categoryName = req.body.category;
    const categoryDiscount = req.body.discount;
    const categoryShow = req.body.showOnHome;
    Category.findByIdAndUpdate(
        req.body.id,
        {
            category: categoryName,
            discount: categoryDiscount,
            showOnHome: categoryShow
        },
        { new: true, runSettersOnQuery: true },
        (err, doc) => {
            if (err)
                res.status(500).json(err);
            else
                res.json({ category: doc });
        }
    );
};

const deleteCategory = (req, res) => {
    Category.findOneAndDelete({ category: req.body.category }, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
    })
};


//////////////////////////////////////////////////////////////////////////Banner Routes//////////////////////////////////////////////////////////////////////////

const listBanners = (req, res) => {
    Banner.find((err, banners) => {
        if (err)
            res.status(500).json(err);
        else
            res.json({ banners });
    });
};

const addBanner = (req, res) => {
    const newBanner = new Banner({
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: req.body.image,
        navigateTo: req.body.navigateTo,
        book: req.body.book
    });

    newBanner.save().then((banner) => {
        res.json({ banner });
    }).catch((err) => {
        res.status(400).json(err);
    });
};

const modifyBanner = (req, res) => {
    Banner.findByIdAndUpdate(
        req.body.id,
        {
            title: req.body.title,
            subtitle: req.body.subtitle,
            image: req.body.image,
            navigateTo: req.body.navigateTo,
            book: req.body.book
        },
        (err, banner) => {
            if (err)
                res.status(500).json(err);
            else {
                deleteImage(banner.image.imageId);
                console.log(banner);
                res.json({ banner });
            }
        });
};

const deleteBanner = (req, res) => {
    Banner.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else {
            deleteImage(doc.image.imageId);
            res.status(200).json(doc);
        }
    });
};

//////////////////////////////////////////////////////////////////////////Book Routes//////////////////////////////////////////////////////////////////////////

const deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else {
            deleteImage(doc.image.imageId);
            res.status(200).json(doc);
        }
    });
};

const modifyBook = (req, res) => {
    Book.findByIdAndUpdate(
        req.body.id,
        {
            title: req.body.title,
            authors: req.body.authors,
            markedPrice: req.body.markedPrice,
            discount: req.body.discount,
            category: req.body.category,
            subCategory: req.body.subCategory,
            type: req.body.type,
            language: req.body.language,
            publisher: req.body.publisher,
            publishYear: req.body.publishYear,
            pages: req.body.pages,
            ISBN10: req.body.ISBN10,
            ISBN13: req.body.ISBN13,
            stock: req.body.stock,
            height: req.body.height,
            breadth: req.body.breadth,
            length: req.body.length,
            weight: req.body.weight,
            bookSemester: req.body.bookSemester,
            bindingType: req.body.bindingType,
            image: req.body.image,
            details: req.body.details
        },
        { runSettersOnQuery: true },
        (err, book) => {
            if (err)
                res.status(500).json(err);
            else {
                deleteImage(book.image.imageId);
                res.json({ book });
            }
        }
    );
};

const addBook = (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors,
        markedPrice: req.body.markedPrice,
        discount: req.body.discount,
        category: req.body.category,
        subCategory: req.body.subCategory,
        type: req.body.type,
        language: req.body.language,
        publisher: req.body.publisher,
        publishYear: req.body.publishYear,
        pages: req.body.pages,
        ISBN10: req.body.ISBN10,
        ISBN13: req.body.ISBN13,
        stock: req.body.stock,
        height: req.body.height,
        breadth: req.body.breadth,
        length: req.body.length,
        weight: req.body.weight,
        bookSemester: req.body.bookSemester,
        bindingType: req.body.bindingType,
        image: req.body.image,
        details: req.body.details
    });

    newBook.save().then((book) => {
        res.json({ book });
    }).catch((err) => {
        res.status(400).json(err);
    });
};

const listBooks = (req, res) => {
    Book.find((err, books) => {
        if (err)
            res.status(500).json(err);
        else
            res.json({ books });
    });
};

//////////////////////////////////////////////////////////////////////////PromoCode Routes//////////////////////////////////////////////////////////////////////////

const listPromoCodes = (req, res) => {
    PromoCode.find((err, promoCodes) => {
        if (err)
            res.status(500).json(err);
        else
            res.json({ promoCodes });
    });
};

const addPromoCode = (req, res) => {
    const newPromoCode = new PromoCode({
        code: req.body.code,
        desc: req.body.desc,
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        discount: req.body.discount,
        categories: req.body.categories
    });

    newPromoCode.save().then((promoCode) => {
        res.json({ promoCode });
    }).catch((err) => {
        res.status(400).json(err);
    });
};

const modifyPromoCode = (req, res) => {
    PromoCode.findByIdAndUpdate(
        req.body.id,
        {
            code: req.body.code,
            desc: req.body.desc,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            discount: req.body.discount,
            categories: req.body.categories
        },
        { new: true, runSettersOnQuery: true },
        (err, promoCode) => {
            if (err)
                res.status(500).json(err);
            else
                res.json({ promoCode });
        });
};

const deletePromoCode = (req, res) => {
    PromoCode.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
    });
};

//////////////////////////////////////////////////////////////////////////HomePage Action Routes//////////////////////////////////////////////////////////////////////////

////////////////////////////////////////New Arrivals Routes////////////////////////////////////////
const addNewArrival = (req, res) => {
    const newArrival = new NewArrival({
        bookId: db.Types.ObjectId(req.body.bookId)
    });
    newArrival.save().then((newArrival) => {
        res.json({ newArrival });
    }).catch((err) => {
        res.status(500).json(err);
    });
};

const listNewArrivals = (req, res) => {
    NewArrival.find().populate('bookId').exec((err, newArrivals) => {
        if (err)
            res.status(500).json(err);
        else
            res.json(newArrivals);
    });
};

const deleteNewArrival = (req, res) => {
    NewArrival.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
    });
};


////////////////////////////////////////OnSale Routes////////////////////////////////////////
const addOnSale = (req, res) => {
    const newOnSale = new OnSale({
        bookId: db.Types.ObjectId(req.body.bookId)
    });
    newOnSale.save().then((onSale) => {
        res.json({ onSale });
    }).catch((err) => {
        res.status(500).json(err);
    });
};

const listOnSales = (req, res) => {
    OnSale.find().populate('bookId').exec((err, onSales) => {
        if (err)
            res.status(500).json(err);
        else
            res.json(onSales);
    });
};

const deleteOnSale = (req, res) => {
    OnSale.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
    });
};


////////////////////////////////////////Featured Product Routes////////////////////////////////////////
const addFeaturedProduct = (req, res) => {
    const newFeaturedProduct = new FeaturedProduct({
        bookId: db.Types.ObjectId(req.body.bookId)
    });
    newFeaturedProduct.save().then((featuredProduct) => {
        res.json({ featuredProduct });
    }).catch((err) => {
        res.status(500).json(err);
    });
};

const listFeaturedProducts = (req, res) => {
    FeaturedProduct.find().populate('bookId').exec((err, featuredProducts) => {
        if (err)
            res.status(500).json(err);
        else
            res.json(featuredProducts);
    });
};

const deleteFeaturedProduct = (req, res) => {
    FeaturedProduct.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
    });
};


////////////////////////////////////////BestSeller Routes////////////////////////////////////////
const addBestSeller = (req, res) => {
    const newBestSeller = new BestSeller({
        bookId: db.Types.ObjectId(req.body.bookId)
    });
    newBestSeller.save().then((bestSeller) => {
        res.json({ bestSeller });
    }).catch((err) => {
        res.status(500).json(err);
    });
};

const listBestSellers = (req, res) => {
    BestSeller.find().populate('bookId').exec((err, bestSellers) => {
        if (err)
            res.status(500).json(err);
        else
            res.json(bestSellers);
    });
};

const deleteBestSeller = (req, res) => {
    BestSeller.findByIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
    });
};

module.exports = {
    categoryList,
    addCategory,
    modifyCategory,
    deleteCategory,
    listBanners,
    addBanner,
    modifyBanner,
    deleteBanner,
    deleteBook,
    modifyBook,
    addBook,
    listBooks,
    addPromoCode,
    listPromoCodes,
    modifyPromoCode,
    deletePromoCode,
    addNewArrival,
    listNewArrivals,
    deleteNewArrival,
    addOnSale,
    listOnSales,
    deleteOnSale,
    addFeaturedProduct,
    deleteFeaturedProduct,
    listFeaturedProducts,
    addBestSeller,
    deleteBestSeller,
    listBestSellers
}

