const { Category } = require("../model/categoryModel");
const { Banner } = require("../model/bannerModel");
const { PromoCode } = require("../model/promoCodeModel");


const categoryList = (req, res) => {
    Category.Find((err, docs) => {
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
    newCategory.save().then((doc) => {
        res.json({ category: doc });
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
        subTitle: req.body.subTitle,
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
            subTitle: req.body.subTitle,
            image: req.body.image,
            navigateTo: req.body.navigateTo,
            book: req.body.book
        },
        { new: true },
        (err, banner) => {
            if (err)
                res.status(500).json(err);
            else
                res.json({ banner });
        });
};

const deleteBanner = (req, res) => {
    Banner.findIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
    });
};

const deleteBook = (req, res) => {
    Book.findIdAndDelete(req.body.id, (err, doc) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(doc);
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
        { new: true, runSettersOnQuery: true },
        (err, book) => {
            if (err)
                res.status(500).json(err);
            else
                res.json({ book });
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
    })
};

const listBooks = (req, res) => {
    Book.find((err, books) => {
        if (err)
            res.status(500).json(err);
        else
            res.json({ books });
    });
};

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
        start: req.body.start,
        end: req.body.end,
        discount: req.body.discount,
        category: req.body.category
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
            start: req.body.start,
            end: req.body.end,
            discount: req.body.discount,
            category: req.body.category
        },
        { new: true },
        (err, promoCode) => {
            if (err)
                res.status(500).json(err);
            else
                res.json({ promoCode });
        });
};

const deletePromoCode = (req, res) => {
    PromoCode.findIdAndDelete(req.body.id, (err, doc) => {
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
    deletePromoCode
}

