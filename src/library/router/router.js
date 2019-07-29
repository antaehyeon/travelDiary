import React from "react";
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from "react-native-router-flux";

// Launch
import Launch from "src/screens/launch";

// Main
import Main from "src/screens/main";

// Deatil
import Detail from "src/screens/detail";

// TEST
import FontTest from "src/screens/testScreens/FontTest.js";

export default props => {
  return (
    <Router>
      <Overlay key="overlay">
        <Modal hideNavBar>
          <Stack key="launchStack" hideNavBar>
            <Scene key="launch" component={Launch} initial />
            <Scene key="main" component={Main} />
            <Scene key="detail" component={Detail} />
            <Scene key="fontTest" component={FontTest} />
          </Stack>
        </Modal>
      </Overlay>
    </Router>
  );
};
