const express = require("express");
const router = express.Router();
const db = require("../Config/db");
const multer = require("multer");
const isAdmin = require("../middleware/Check_Admin");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Display products page
router.get("/", isAdmin, (req, res) => {
  const sql = "SELECT * FROM products ORDER BY Product_ID DESC";

  pool.query(sql, (error, results) => {
    if (error) {
      return res.render("Admin/Products", {
        products: [],
        productCount: 0,
        error: "Error loading products",
        customer: req.session.customer,
      });
    }

    res.render("Admin/Products", {
      products: results,
      productCount: results.length,
      customer: req.session.customer,
    });
  });
});

// Add new product
router.post("/Add", isAdmin, upload.single("image"), (req, res) => {
  const {
    Product_Name,
    Category,
    Price,
    TotalStock,
    Description,
    Material,
    Colour,
  } = req.body;

  const imagePath = req.file ? "/Uploads/" + req.file.filename : null;

  // ✅ Log what's coming in
  console.log("Form Data:", req.body);
  console.log("Uploaded File:", req.file);

  const sql = `INSERT INTO products 
    (Product_Name, Category, Price, TotalStock, Description, Image, Material, Colour)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    Product_Name,
    Category,
    Price,
    TotalStock,
    Description || null,
    imagePath || null,
    Material || null,
    Colour || null,
  ];

  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error("❌ SQL Insert Error:", error);
      return res.redirect("/Products?error=Failed to add product");
    }

    console.log("✅ Product inserted with ID:", results.insertId);
    res.redirect("/Products");
  });
});

// Edit product page
router.get("/edit/:id", isAdmin, (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.redirect("/Products");
  }

  pool.query(
    "SELECT * FROM products WHERE Product_ID = ?",
    [productId],
    (error, results) => {
      if (error) {
        return res.redirect("/Products");
      }

      if (results.length === 0) {
        return res.redirect("/Products");
      }

      const product = results[0];

      res.render("Admin/EditProduct", {
        product: product,
        customer: req.session.customer,
      });
    }
  );
});

// Update product
router.post("/edit/:id", isAdmin, upload.single("image"), (req, res) => {
  const productId = req.params.id;

  const {
    Product_Name,
    Category,
    Price,
    TotalStock,
    Description,
    Material,
    Colour,
  } = req.body;

  // Validate required fields
  if (!Product_Name || !Category || !Price || !TotalStock) {
    return res.redirect("/Products");
  }

  // Get image path if new file uploaded, otherwise keep existing
  let imagePath = null;
  if (req.file) {
    imagePath = "/Uploads/" + req.file.filename;
  }

  // Build SQL query based on whether new image was uploaded
  let sql, values;
  if (imagePath) {
    sql = `UPDATE products SET 
            Product_Name = ?, Category = ?, Price = ?, TotalStock = ?, 
            Description = ?, Image = ?, Material = ?, Colour = ?
          WHERE Product_ID = ?`;
    values = [
      Product_Name,
      Category,
      Price,
      TotalStock,
      Description,
      imagePath,
      Material,
      Colour,
      productId,
    ];
  } else {
    sql = `UPDATE products SET 
            Product_Name = ?, Category = ?, Price = ?, TotalStock = ?, 
            Description = ?, Material = ?, Colour = ?
          WHERE Product_ID = ?`;
    values = [
      Product_Name,
      Category,
      Price,
      TotalStock,
      Description,
      Material,
      Colour,
      productId,
    ];
  }

  pool.query(sql, values, (error, results) => {
    if (error) {
      return res.redirect("/Products");
    }

    res.redirect("/Products");
  });
});

// Delete product
router.post("/delete/:id", isAdmin, (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.redirect("/Products");
  }

  pool.query(
    "DELETE FROM products WHERE Product_ID = ?",
    [productId],
    (error, results) => {
      if (error) {
        return res.redirect("/Products");
      }

      res.redirect("/Products");
    }
  );
});

// Get products for homepage
router.get("/api/all", (req, res) => {
  pool.query(
    "SELECT * FROM products WHERE TotalStock > 0 ORDER BY Product_ID DESC",
    (error, results) => {
      if (error) {
        return res.json([]);
      }

      res.json(results);
    }
  );
});

module.exports = router;
