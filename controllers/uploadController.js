import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";

export const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "personal-finance-tracker/profile-pictures",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(req.file.buffer);
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePicture: result.secure_url,
      },
      {
        new: true,
      },
    ).select("-password");

    res.json({
      success: true,
      message: "Profile picture uploaded",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
