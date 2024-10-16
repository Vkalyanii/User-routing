sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
    ],
    function(Controller,Filter,FilterOperator) {
      "use strict";
 
      return Controller.extend("com.app.userrouting.controller.FirstScreen", {
        onInit: function() {
          this.ID;
        },
        onpresslogin:function() {
          var oUser = this.byId("idUsernameInput_cl").getValue();
          var oPass = this.byId("idUserIDInput_cl").getValue();
          if (!oUser || !oPass) {
            sap.m.MessageToast.show("Please enter both username and password.");
            return;
        }
    var oModel = this.getOwnerComponent().getModel();
    var that = this;
        oModel.read("/UsersSet", {
            success: function(odata) {
                // Filter results based on username and password
                var testResult = odata.results.filter(entry =>
                 
                  entry.Resourcename.trim().toLowerCase() === oUser.toLowerCase() &&
                    entry.Password === oPass,
                );
    
                if (testResult.length > 0) {
                    // User found, navigate to the InitialScreen
                    const oRouter = that.getOwnerComponent().getRouter();
                    oRouter.navTo("InitialScreen",{id:testResult[0].Resourceid});
                } else {
                    // Handle invalid credentials
                    sap.m.MessageToast.show("Invalid username or password.");
                }

          },
        error:function(oError){

        }})
        }
      });
    }
  );