import Product from "../models/productModel.js";

// @desc    Get products (Public + Admin with search & pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 6;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Admin
export const createProduct = async (req, res) => {
  const {
    name,
    price,
    brand, // ✅ ADDED
    quality,
    isNewArrival,
    isTrending,
  } = req.body;

  const product = new Product({
    name: name?.trim(),
    price,
    brand: brand?.trim().toLowerCase(), // ✅ IMPORTANT FIX
    quality: quality?.trim(),
    isNewArrival,
    isTrending,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name?.trim() ?? product.name;
  product.price = req.body.price ?? product.price;

  // ✅ BRAND UPDATE FIX
  if (req.body.brand) {
    product.brand = req.body.brand.trim().toLowerCase();
  }

  product.quality = req.body.quality?.trim() ?? product.quality;

  product.isNewArrival = req.body.isNewArrival ?? product.isNewArrival;

  product.isTrending = req.body.isTrending ?? product.isTrending;

  if (req.file) {
    product.image = `/uploads/${req.file.filename}`;
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
};
