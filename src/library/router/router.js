import React from "react";
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox } from "react-native-router-flux";

// Launch
import Launch from "src/screens/launch";

// Main
import Main from "src/screens/main";

// Deatil
import Detail from "src/screens/detail";

export default props => {
  return (
    <Router>
      <Overlay key="overlay">
        <Modal hideNavBar>
          <Stack key="launchStack" hideNavBar>
            <Scene key="launch" component={Launch} />
            <Scene key="main" component={Main} initial />
            <Scene key="detail" component={Detail} />
          </Stack>
        </Modal>
      </Overlay>
    </Router>
  );
};
