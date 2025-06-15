import asyncHandler from "express-async-handler";
const logoutController = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      res.status(404).json({
        error: {
          message: "There has been an error in logging out! Please try again",
          status: 404,
        },
      });
    } else {
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.status(200).json({
          data: {
            message: "You are successfully logged out",
            status: 200,
          },
        });
      });
    }
  });
});

export default logoutController;
