app.factory("notificationHelper", function() {
    return {
      displayWin: function() {
        return swal({
          title: "W000t!",
          text: "You Won!",
          type: "success",
          confirmButtonColor: "gray"
        });
      },
      displayLoss: function(error) {
        return swal({
          title: "Boom!",
          text: error ? error : "Unfortunately you lost, retry by clicking on restart",
          type: "error",
          confirmButtonColor: "gray"
        });
      }
    };
});

