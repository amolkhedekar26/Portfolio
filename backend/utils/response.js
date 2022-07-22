module.exports = {
  handleSuccessResponse: (res, data, message) => {
    res.status(200).json({
      success: true,
      status: 200,
      message: message,
      data: data,
    });
  },
  handleErrorResponse: (res, error) => {
    res.status(error.status || 500).json({
      success: false,
      status: error.status || 500,
      message: error.message,
    });
  },
};
