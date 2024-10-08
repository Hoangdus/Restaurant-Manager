require("dotenv").config();
const express = require("express");
const router = express.Router();
const { SignJWT, jwtVerify } = require("jose");
const upload = require("../config/common/upload");

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const User = require("../models/account");
const AccountDetail = require("../models/accountDetail");
const Table = require("../models/table");

const verifyToken = async (authHeader) => {
  if (!authHeader) {
    throw new Error("Has not token");
  }

  const token = authHeader.split(" ")[1]; // split token from authHeader
  const { payload } = await jwtVerify(token, secret); // verify token

  return payload;
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // check username exist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({
      username,
      password,
      role: role || 0,
    });
    await newUser.save();

    const newAccountDetail = new AccountDetail({
      id_account: newUser._id,
      full_name: "",
      phone_number: "",
      address: "",
      picture_url: "",
    });
    await newAccountDetail.save();

    res
      .status(200)
      .json({ message: "Register Successfully", newUser, newAccountDetail });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await new SignJWT({ id: user._id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const payload = await verifyToken(authHeader);

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }


    res.status(200).json({ message: "List of users", users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Put user information
router.put("/user", upload.single("avatar"), async (req, res) => {
  try {
    const data = req.body;
    const { file } = req;

    const authHeader = req.headers.authorization;
    const payload = await verifyToken(authHeader);

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const accountDetail = await AccountDetail.findOne({ id_account: user._id });
    if (!accountDetail) {
      return res.status(404).json({ message: "Account-detail does not exist" });
    }

    accountDetail.full_name = data.full_name ?? accountDetail.full_name;
    accountDetail.phone_number =
      data.phone_number ?? accountDetail.phone_number;
    accountDetail.address = data.address ?? accountDetail.address;

    if (file) {
      accountDetail.picture_url = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${file.filename}`;
    }

    await accountDetail.save();

    res.status(200).json({
      message: "Update user successfully",
      user: {
        username: user.username,
        role: user.role,
        full_name: accountDetail.full_name,
        phone_number: accountDetail.phone_number,
        address: accountDetail.address,
        picture_url: accountDetail.picture_url,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// Get user information
router.get("/user", async (req, res) => {
  try {
    // get header authorization from request
    const authHeader = req.headers.authorization;
    const payload = await verifyToken(authHeader);

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const accountDetail = await AccountDetail.findOne({ id_account: user._id });
    if (!accountDetail) {
      return res.status(404).json({ message: "Account detail does not exist" });
    }

    res.status(200).json({
      username: user.username,
      role: user.role,
      full_name: accountDetail.full_name,
      phone_number: accountDetail.phone_number,
      address: accountDetail.address,
      picture_url: accountDetail.picture_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// Get tables
router.get("/tables", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const payload = await verifyToken(authHeader);

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const tables = await Table.find().populate("id_account");

    res.status(200).json({ message: "List tables", tables });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get table by _id
router.get("/table/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const authHeader = req.headers.authorization;
    const payload = await verifyToken(authHeader);

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const table = await Table.findOne().populate("id_account");

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.status(200).json({ message: "Table Information", table });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add new table
router.post("/table", async (req, res) => {
  try {
    const { table_name, table_status, oder_name } = req.body;

    const authHeader = req.headers.authorization;
    const payload = await verifyToken(authHeader);

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Check table_name exist
    const existingTable = await Table.findOne({ table_name });
    if (existingTable) {
      return res.status(400).json({ message: "table-name already exists" });
    }

    const newTable = new Table({
      table_name,
      table_status: table_status || 0, // Default: 0 (con` trong)
      oder_name: oder_name || null,
      id_account: null,
    });

    await newTable.save();

    res
      .status(200)
      .json({ message: "Table added successfully", table: newTable });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Put table
router.put("/table/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { table_status, oder_name, id_account } = req.body;

    const currentTable = await Table.findById(id);
    if (!currentTable) {
      return res.status(404).json({ message: "Current table not found" });
    }

    // Cập nhật trạng thái bàn nếu được cung cấp
    if (table_status !== undefined) {
      if (table_status === 0) {
        currentTable.id_account = null;
        currentTable.oder_name = null;
      }

      currentTable.table_status = table_status;
    }

    // Cập nhật thông tin đơn hàng nếu có
    if (oder_name !== undefined) {
      currentTable.oder_name = oder_name;
    }

    // Cập nhật tài khoản nếu có
    if (id_account !== undefined) {
      currentTable.id_account = id_account;
    }

    const updatedTable = await currentTable.save();

    res.status(200).json({
      message: "Table status update successfully",
      table: updatedTable,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

module.exports = router;
