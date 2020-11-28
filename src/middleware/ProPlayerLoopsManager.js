export function ProPlayerLoopsManager() {
  this.a_Collections = [];
  this.n_LastActiveCollectionID = -1;
  this.hasLists = function() {
    return this.a_Collections.length > 0;
  };
  this.setLastActiveCollectionID = function(nCollectionID) {
    this.n_LastActiveCollectionID = nCollectionID;
    //console.log("Setting last active list to:" + nListID);
  };
  this.getLastActiveListID = function() {
    return this.n_LastActiveCollectionID;
  };
  this.resetAll = function() {
    for (let i = 0; i < this.a_Collections.length; i++) {
      this.a_Collections[i].reset();
    }

    this.a_Collections.length = 0;

    $("#addUserLoopButton").toggleClass("disabled", true);
    $("#saveUserLoopsButton").toggleClass("disabled", true);
  };

  this.createNewCollection = function(
    strUIParentID,
    strCollectionRole,
    bEditable
  ) {
    var theCollection = this.getCollectionByRole(strCollectionRole);
    if (theCollection == null) {
      var newCollectionID = this.a_Collections.length;
      theCollection = new ProPlayerLoopsCollection(
        newCollectionID,
        strUIParentID,
        strCollectionRole,
        bEditable
      );
      this.appendCollection(theCollection);
    } else {
      theCollection.reset();
      this.pushUserLoopInterfaceState();
    }
    return theCollection;
  };

  this.addListToCollectionFromArray = function(
    aLoopsArray,
    strCollectionRole,
    strListTitle,
    bResetCollection
  ) {
    //The collection must already exist before calling this method.
    var theCollection = this.getCollectionByRole(strCollectionRole);
    if (theCollection !== null) {
      if (bResetCollection) {
        //only reset the collection if indicated, otherwise append new list.
        theCollection.reset();
      }
      theCollection.addListFromLoopArray(aLoopsArray, strListTitle);
      theCollection.rebuildLoopsUIList();
    }
    this.pushUserLoopInterfaceState();
  };

  this.appendCollection = function(newCollection) {
    this.a_Collections.push(newCollection);
  };

  this.getCollectionAt = function(nIndex) {
    return this.a_Collections[nIndex];
  };

  this.getCollectionByID = function(nCollectionID) {
    let theCollection = null;
    for (let i = 0; i < this.a_Collections.length; i++) {
      if (this.a_Collections[i].getID() == nCollectionID) {
        theCollection = this.a_Collections[i];
        break;
      }
    }
    return theCollection;
  };

  this.getCollectionByRole = function(strCollectionRole) {
    let theCollection = null;
    for (let i = 0; i < this.a_Collections.length; i++) {
      if (this.a_Collections[i].getRole() == strCollectionRole) {
        theCollection = this.a_Collections[i];
      }
    }
    return theCollection;
  };

  this.loopSelected = function(nCollectionID, nListIndex, nLoopIndex) {
    //console.log("Loop Selected: " + nListID + "," + nLoopIndex);
    this.clearActiveLoopsExcept(nCollectionID, nListIndex);
    this.setLastActiveCollectionID(nCollectionID);
    let theCollection = this.getCollectionByID(nCollectionID);
    theCollection.loopSelected(nListIndex, nLoopIndex);
  };

  this.loopToggleSelected = function(nCollectionID, nListIndex, nLoopIndex) {
    this.clearActiveLoopsExcept(nCollectionID, nListIndex);
    this.setLastActiveCollectionID(nCollectionID);
    this.getCollectionByID(nCollectionID).loopToggleSelected(
      nListIndex,
      nLoopIndex
    );
  };

  this.activateNextLoop = function() {
    let theID = -1;
    if (this.hasCollections()) {
      theID = this.getLastActiveCollectionID();

      if (theID == -1) {
        theID = this.getCollectionListWithLoops();
      }

      if (theID !== -1) {
        this.getCollectionByID(theID).activateNextLoop();
      }
    }
    return theID;
  };

  this.activatePreviousLoop = function() {
    let theID = -1;
    if (this.hasCollections()) {
      theID = this.getLastActiveCollectionID();

      if (theID == -1) {
        theID = this.getFirstCollectionWithLoops();
      }

      if (theID !== -1) {
        this.getCollectionByID(theID).activatePreviousLoop();
      }
    }
    return theID;
  };

  this.clearActiveLoopsExcept = function(nCollectionID, nListIndex) {
    //console.log("Clearing active loops");
    //Step 1: clear other lists.
    for (let i = 0; i < this.a_Collections.length; i++) {
      //console.log("Clearing active loops for list: " + nListID)
      let theCollection = this.a_Collections[i];
      if (theCollection.getID() == nCollectionID) {
        theCollection.clearActiveLoopsExcept(nListIndex);
      } else {
        theCollection.clearAllActiveLoops();
      }
    }
  };

  this.clearAllActiveLoops = function() {
    //Step 1: clear other lists.
    for (let i = 0; i < this.a_Collections.length; i++) {
      this.a_Collections[i].clearAllActiveLoops();
    }
  };

  this.addUserLoop = function() {
    let theLoop = thePlayer.getEngineLoop();

    if (theLoop !== null) {
      let bWasPlaying = thePlayer.theEngine.isPlaying();
      if (bWasPlaying) {
        thePlayer.theEngine.stopPlayback();
      }
      let loopName = prompt("Enter loop name.", theLoop.getName());

      if (bWasPlaying) {
        thePlayer.theEngine.startPlayback();
      }
      if (loopName != null) {
        theCollection = this.getCollectionByRole("user");
        theLoop.setName(loopName);
        theCollection.addInstantLoop(theLoop);
        theCollection.rebuildLoopsUIList();
        this.pushUserLoopInterfaceState();
      }
    }
  };
  this.removeLoopFromList = function(nCollectionID, nListIndex, nLoopIndex) {
    let theCollection = this.getCollectionByID(nCollectionID);
    theCollection.removeLoop(nListIndex, nLoopIndex);
    theCollection.rebuildLoopsUIList();
    this.pushUserLoopInterfaceState();
  };

  this.getUserLoopsArray = function() {
    return this.getCollectionByRole("user").getLoopsArray();
  };

  this.pushUserLoopInterfaceState = function() {
    let bAddButtonEnabled = false;
    let bSaveButtonEnabled = false;
    let userLoopsCollection = this.getCollectionByRole("user");
    //console.log("User List is: " + userList);
    if (userLoopsCollection == null) {
      //console.log("Showing no segment loaded error");
      $("#userLoopListEmpty").toggle(true);
    } else {
      $("#userLoopList").toggleClass("dirty", userLoopsCollection.isDirty());
      bSaveButtonEnabled = userLoopsCollection.isDirty();

      let theLoop = thePlayer.getEngineLoop();
      if (theLoop !== null) {
        bAddButtonEnabled = !userLoopsCollection.findMatchingLoop(theLoop);
      }
    }

    $("#addUserLoopButton").toggleClass("disabled", !bAddButtonEnabled);
    $("#saveUserLoopsButton").toggleClass("disabled", !bSaveButtonEnabled);
  };
  this.savingUserData = function() {
    this.getCollectionByRole("user").showLoadingIndicator();
  };

  this.getFirstListWithLoops = function() {
    let nIndex = -1;
    for (let i = 0; i < this.a_Collections.length; i++) {
      if (this.a_Collections[i].getCollectionLoopCount() > 0) {
        nIndex = i;
        break;
      }
    }
    return nIndex;
  };
}

export function ProPlayerLoopsCollection(
  nCollectionID,
  strListWrapperID,
  strCollectionRole,
  bEditable
) {
  this.str_UIWrapperID = "#" + strListWrapperID;
  this.b_Editable = bEditable;
  this.n_CollectionID = nCollectionID;
  this.str_Role = strCollectionRole;
  this.a_Lists = [];
  this.b_IsDirty = false;
  this.getListCount = function() {
    return this.a_Lists.length;
  };
  this.getID = function() {
    return this.n_CollectionID;
  };
  this.getRole = function() {
    return this.str_Role;
  };
  this.getEditable = function() {
    return this.b_Editable;
  };
  this.isDirty = function() {
    return this.b_IsDirty;
  };
  this.setDirty = function(bDirty) {
    this.b_IsDirty = bDirty;
  };
  this.clearLoopsUIList = function() {
    $(this.str_UIWrapperID).empty();
  };
  this.showLoadingIndicator = function() {
    thePlayer.spinner(this.str_UIWrapperID);
  };

  this.getListAt = function(nIndex) {
    let theList = null;
    if (this.validListIndex(nIndex)) {
      theList = this.a_Lists[nIndex];
    }

    return theList;
  };
  this.reset = function() {
    this.clearLoopsUIList();
    this.a_Lists.length = 0;
    this.setDirty(false);
    $(this.str_UIWrapperID + "Empty").toggle(true);
  };

  this.getLoopsArray = function() {
    let loopsArray = [];
    for (let i = 0; i < this.a_Lists.length; i++) {
      let theLoops = this.a_Lists[i].getLoopsArray();
      for (j = 0; j < theLoops.length; j++) {
        loopsArray.push(theLoops[j]);
      }
    }

    console.log(loopsArray);
    return loopsArray;
  };
  this.getCollectionLoopCount = function() {
    let theTotal = 0;
    for (let i = 0; i < this.a_Lists.length; i++) {
      theTotal += this.a_Lists[i].getListLoopCount();
    }
    return theTotal;
  };
  this.setNewLoopName = function(nListIndex, nLoopIndex, strNewName) {
    var theLoop = this.getLoopAt(nListIndex, nLoopIndex);

    if (theLoop !== null) {
      theLoop.setName(strNewName);
      this.setDirty(true);
    }
  };

  this.getLoopAt = function(nListIndex, nLoopIndex) {
    if (this.validListIndex(nListIndex)) {
      return this.a_Lists[nListIndex].getLoopAt(nLoopIndex);
    } else {
      return null;
    }
  };

  this.validListIndex = function(nListIndex) {
    return nListIndex < this.a_Lists.length ? true : false;
  };

  this.rebuildLoopsUIList = function() {
    thePlayer.spinner(this.str_UIWrapperID);
    $(this.str_UIWrapperID + "Empty").toggle(false);

    //this function assumes the loop list has already been reset
    let strListHTML = "";
    let bEditable = this.getEditable();
    let collectionID = this.getID();

    let bUseAccordion = this.a_Lists.length > 1;
    if (bUseAccordion) {
      strListHTML +=
        '<ul class="accordion sidebar-accordion" id="loopsListAccordion-' +
        this.getRole() +
        '" ';
      strListHTML +=
        'data-accordion data-allow-all-closed="true" data-multi-expand="false">';
    }

    for (let listIndex = 0; listIndex < this.a_Lists.length; listIndex++) {
      let theList = this.a_Lists[listIndex];
      if (bUseAccordion) {
        strListHTML += '<li class="accordion-item" data-accordion-item>';
        strListHTML +=
          '<a class="accordion-title">' + theList.getListTitle() + "</a>";
        strListHTML += '<div class="accordion-content" data-tab-content>';
      }

      strListHTML += '<ul class="sidebar-list dark">';

      for (
        let loopIndex = 0;
        loopIndex < theList.getLoopsArray().length;
        loopIndex++
      ) {
        let theLoop = theList.getLoopAt(loopIndex);
        theLoop.setChecked(false);
        var loopItem =
          '<li class="sidebar-list-item loop button" id="loopItem-';
        loopItem += collectionID + "-" + listIndex + "-" + loopIndex + '">';
        let bStacking = theList.enableLoopStacking(loopIndex);

        if (bStacking || bEditable) {
          let theClass = "";
          if (bStacking && bEditable) {
            theClass = "both";
          }
          loopItem += '<a class="sidebar-list-item-link ' + theClass;
          loopItem += '" onClick="thePlayer.loopsManager.loopSelected(';
          loopItem += collectionID + "," + listIndex + "," + loopIndex + ')">';
          loopItem += theLoop.getName();
          loopItem += "</a>";
          if (bStacking) {
            loopItem += '<a class="sidebar-list-item-button check-button ';
            loopItem +=
              theClass +
              '" onClick="thePlayer.loopsManager.loopToggleSelected(';
            loopItem +=
              collectionID +
              "," +
              listIndex +
              "," +
              loopIndex +
              '); return false;"></a>';
          }
          if (bEditable) {
            loopItem += '<a class="sidebar-list-item-button delete-button ';
            loopItem +=
              theClass +
              '" onClick="thePlayer.loopsManager.removeLoopFromList(';
            loopItem +=
              collectionID +
              "," +
              listIndex +
              "," +
              loopIndex +
              '); return false;"></a>';
          }
        } else {
          loopItem += '<a onClick="thePlayer.loopsManager.loopSelected(';
          loopItem += collectionID + "," + listIndex + "," + loopIndex + ')">';
          loopItem += theLoop.getName();
          loopItem += "</a>";
        }
        loopItem += "</li>";

        strListHTML += loopItem;
      }

      strListHTML += "</ul>";
      if (bUseAccordion) {
        strListHTML += "</div></li>";
      }
    }
    $(this.str_UIWrapperID).html(strListHTML);
    if (this.getCollectionLoopCount() == 0) {
      //console.log("Showing error message for empty list.");
      $(this.str_UIWrapperID + "Empty").toggle(true);
    }

    if (bUseAccordion) {
      let accordionID = "#loopsListAccordion-" + this.getRole();
      $(accordionID).foundation();
    }
  };

  this.appendList = function(newList) {
    this.a_Lists.push(newList);
  };
  this.addListFromLoopArray = function(aLoopsArray, strListTitle) {
    //array must elements assumed to be in [name, start, end] format\
    //Clear this collection before calling this if you don't want the new
    // list appended.
    let theListIndex = this.a_Lists.length;
    let theList = new ProPlayerLoopsList(
      this.getID(),
      theListIndex,
      strListTitle
    );
    theList.createFromLoopArray(aLoopsArray);
    this.appendList(theList);
    this.setDirty(false);
  };

  this.findMatchingLoop = function(loopToMatch) {
    bMatchFound = false;
    for (let i = 0; i < this.a_Lists.length; i++) {
      if (this.a_Lists[i].findMatchingLoop(loopToMatch)) {
        bMatchFound = true;
        break;
      }
    }
    return bMatchFound;
  };

  this.clearActiveLoopsExcept = function(nListIndex) {
    for (let i = 0; i < this.a_Lists.length; i++) {
      if (i !== nListIndex) {
        this.a_Lists[i].clearActiveLoops();
        this.a_Lists[i].refreshLoopCheckedStates();
      }
    }
  };

  this.clearAllActiveLoops = function() {
    for (let i = 0; i < this.a_Lists.length; i++) {
      this.a_Lists[i].clearActiveLoops();
      this.a_Lists[i].refreshLoopCheckedStates();
    }
  };

  this.loopSelected = function(nListIndex, nLoopIndex) {
    if (this.validListIndex(nListIndex)) {
      this.getListAt(nListIndex).loopSelected(nLoopIndex);
    }
  };

  this.loopToggleSelected = function(nListIndex, nLoopIndex) {
    if (this.validListIndex(nListIndex)) {
      this.getListAt(nListIndex).loopToggleSelected(nLoopIndex);
    }
  };

  this.addInstantLoop = function(theLoop) {
    let theList = this.getListAt(0);
    if (theList == null) {
      theList = new ProPlayerLoopsList(this.getID(), 0);
      this.appendList(theList);
    }

    theList.addInstantLoop(theLoop);
    this.setDirty(true);
  };

  this.addInstantLoopToList = function(nListIndex, theLoop) {
    if (this.validListIndex(nListIndex)) {
      this.getListAt(nListIndex).addInstantLoop(theLoop);
      this.setDirty(true);
    }
  };

  this.removeLoop = function(nListIndex, nLoopIndex) {
    if (this.validListIndex(nListIndex)) {
      this.getListAt(nListIndex).removeLoop(nLoopIndex);
      this.setDirty(true);
    }
  };
}

export function ProPlayerLoopsList(nCollectionID, nListID, strListTitle) {
  this.a_Loops = [];
  this.n_CollectionID = nCollectionID;
  this.n_ListID = nListID;
  this.str_ListTitle = strListTitle;
  this.getCollectionID = function() {
    return this.n_CollectionID;
  };
  this.getListID = function() {
    return this.n_ListID;
  };
  this.getListTitle = function() {
    return this.str_ListTitle;
  };
  this.setLoopsList = function(a_newLoopsList) {
    this.a_Loops = a_newLoopsList;
  };
  this.getLoopAt = function(nIndex) {
    return this.a_Loops[nIndex];
  };
  this.getLoopStart = function(nIndex) {
    return this.getLoopAt(nIndex).getLoopStart();
  };
  this.getLoopEnd = function(nIndex) {
    return this.getLoopAt(nIndex).getLoopEnd();
  };
  this.getListLoopCount = function() {
    return this.a_Loops.length;
  };
  this.reset = function() {
    this.a_Loops.length = 0;
  };

  this.addLoopFromValues = function(strName, fLoopStart, fLoopEnd) {
    this.a_Loops.push(new InstantLoop(strName, fLoopStart, fLoopEnd));
  };

  this.addInstantLoop = function(theLoop) {
    this.a_Loops.push(theLoop);
    return this.a_Loops.length - 1;
  };

  this.setNewLoopName = function(nLoopIndex, strNewName) {
    this.getLoopAt(nLoopIndex).setName(strNewName);
  };

  this.activateNextLoop = function() {
    var currentIndex = this.getFirstActiveLoop();
    if (currentIndex > -1) {
      if (currentIndex < this.a_Loops.length - 1) {
        this.loopSelected(currentIndex + 1);
      } else {
        this.loopSelected(0);
      }
    }
  };

  this.activatePreviousLoop = function() {
    var currentIndex = this.getFirstActiveLoop();
    if (currentIndex > -1) {
      if (currentIndex > 0) {
        this.loopSelected(currentIndex - 1);
      } else {
        this.loopSelected(this.a_Loops.length - 1);
      }
    }
  };

  this.getFirstActiveLoop = function() {
    let nIndex = -1;

    if (this.a_Loops.length > 0) {
      nIndex = 0;
      for (let i = 0; i < this.a_Loops.length; i++) {
        if (this.a_Loops[i].getChecked()) {
          nIndex = i;
          break;
        }
      }
    }
    return nIndex;
  };

  this.removeLoop = function(nIndex) {
    //console.log('Current List: ' + this.a_Loops);
    //console.log('Removing Loop at: ' + nIndex);
    this.a_Loops.splice(nIndex, 1);
    //console.log('New List: ' + this.a_Loops);
  };
  this.createFromLoopArray = function(aLoopsArray) {
    //array must elements assumed to be in [name, start, end] format
    for (let i = 0; i < aLoopsArray.length; i++) {
      this.addLoopFromValues(
        aLoopsArray[i][0],
        aLoopsArray[i][1],
        aLoopsArray[i][2]
      );
    }
  };

  this.appendFromLoopArray = function(aLoopsArray) {
    //array must elements assumed to be in [name, start, end] format
    for (let i = 0; i < aLoopsArray.length; i++) {
      this.addLoopFromValues(
        aLoopsArray[i][0],
        aLoopsArray[i][1],
        aLoopsArray[i][2]
      );
    }
  };

  this.findMatchingLoop = function(loopToMatch) {
    let bMatchFound = false;
    for (let i = 0; i < this.a_Loops.length; i++) {
      let myLoop = this.a_Loops[i];
      if (
        Math.abs(loopToMatch.getLoopStart() - myLoop.getLoopStart()) < 0.1 &&
        Math.abs(loopToMatch.getLoopEnd() - myLoop.getLoopEnd()) < 0.1
      ) {
        bMatchFound = true;
      }
    }
    return bMatchFound;
  };

  this.getLoopsArray = function() {
    let newArray = [];
    //array must elements assumed to be in [name, start, end] format
    for (let i = 0; i < this.a_Loops.length; i++) {
      newArray.push([
        this.a_Loops[i].getName(),
        this.a_Loops[i].getLoopStart(),
        this.a_Loops[i].getLoopEnd()
      ]);
    }
    return newArray;
  };

  this.loopSelected = function(nLoopIndex) {
    this.clearActiveLoops();
    this.toggleLoopCheckedState(nLoopIndex);
    this.refreshLoopCheckedStates();
    //console.log("Activating Loop At: " + nLoopIndex);
    var theLoop = this.getLoopAt(nLoopIndex);
    //console.log('Activating Loop:' + theLoop);
    thePlayer.theEngine.loadLoop(
      this.getLoopAt(nLoopIndex).getLoopStart(),
      this.getLoopAt(nLoopIndex).getLoopEnd()
    );
  };

  this.loopToggleSelected = function(nLoopIndex) {
    //console.log('Loop Toggle Selected: ' + nLoopIndex);
    this.processLoopToggle(nLoopIndex);
    this.refreshLoopCheckedStates();
    var theLoop = this.computeStackedLoop();

    if (theLoop !== null) {
      thePlayer.theEngine.loadLoop(
        theLoop.getLoopStart(),
        theLoop.getLoopEnd()
      );
    }
  };

  this.toggleLoopCheckedState = function(nLoopIndex) {
    var isLoopAlreadyChecked = this.getLoopAt(nLoopIndex).getChecked();

    if (isLoopAlreadyChecked && this.isLoopAMiddle(nLoopIndex)) {
      // If this loop is already checked, and user clicks check again,
      // clear all checked loops and turn this one back
      this.clearActiveLoops();
      this.getLoopAt(nLoopIndex).setChecked(true);
    } else {
      var previousLoopChecked = this.getLoopAt(nLoopIndex).toggleChecked();

      if (previousLoopChecked) {
        for (let i = nLoopIndex - 1; i >= 0; i--) {
          if (
            !this.getLoopAt(nLoopIndex).getChecked() ||
            !this.getLoopAt(nLoopIndex).getStackable()
          ) {
            previousLoopChecked = false;
          }
          this.getLoopAt(nLoopIndex).setChecked(previousLoopChecked);
        }

        previousLoopChecked = true;

        for (let i = nLoopIndex + 1; i < this.a_Loops.length; i++) {
          if (
            !this.getLoopAt(i).getChecked() ||
            !this.getLoopAt(i).getStackable()
          ) {
            previousLoopChecked = false;
          }
          this.getLoopAt(i).setChecked(previousLoopChecked);
        }
      }
    }
  };

  this.previousLoopConnected = function(i) {
    bConnected = false;
    if (i > 0) {
      var myStartTime = this.getLoopStart(i);
      var myEndTime = this.getLoopEnd(i);
      var previousStartTime = this.getLoopStart(i - 1);
      var previousEndTime = this.getLoopEnd(i - 1);

      if (
        myStartTime > previousStartTime &&
        myEndTime > previousEndTime &&
        myStartTime - previousEndTime < 2
      ) {
        bConnected = true;
      }
    }
    return bConnected;
  };

  this.nextLoopConnected = function(i) {
    bConnected = false;
    if (i < this.a_Loops.length - 1) {
      var myStartTime = this.getLoopStart(i);
      var myEndTime = this.getLoopEnd(i);
      var nextStartTime = this.getLoopStart(i + 1);
      var nextEndTime = this.getLoopEnd(i + 1);

      if (
        myStartTime < nextStartTime &&
        myEndTime < nextEndTime &&
        nextStartTime - myEndTime < 2
      ) {
        bConnected = true;
      }
    }

    return bConnected;
  };

  this.enableLoopStacking = function(nLoopIndex) {
    var bEnableStacking = false;

    if (
      !this.previousLoopConnected(nLoopIndex) &&
      this.nextLoopConnected(nLoopIndex) &&
      this.nextLoopConnected(nLoopIndex + 1)
    ) {
      //Is this the first loop in a series,
      //meaning i, i+1, and i+2 are stackable, but i-1 is not
      bEnableStacking = true;
    } else if (
      this.previousLoopConnected(nLoopIndex) &&
      this.nextLoopConnected(nLoopIndex)
    ) {
      //Is this in the middle of a series?
      //meaning i, i-1 and i+1 are all stackable
      bEnableStacking = true;
    } else if (
      this.previousLoopConnected(nLoopIndex - 1) &&
      this.previousLoopConnected(nLoopIndex)
    ) {
      //Is this the end of a chain?
      //meaning i-2, i-1 and i are stackable, but i+1 is not.
      bEnableStacking = true;
    }

    this.getLoopAt(nLoopIndex).setStackable(bEnableStacking);
    return bEnableStacking;
  };

  this.clearActiveLoops = function() {
    for (let i = 0; i < this.a_Loops.length; i++) {
      this.getLoopAt(i).setChecked(false);
    }

    this.refreshLoopCheckedStates();
  };

  this.refreshLoopCheckedStates = function() {
    for (let i = 0; i < this.a_Loops.length; i++) {
      $(this.getLoopParentID(i)).toggleClass(
        "active",
        this.getLoopAt(i).getChecked()
      );
    }
  };

  this.getLoopParentID = function(nIndex) {
    return (
      "#loopItem-" +
      this.getCollectionID() +
      "-" +
      this.getListID() +
      "-" +
      nIndex
    );
  };

  this.processLoopToggle = function(nSelectedIndex) {
    //console.log("Processing Loop Toggle At: " + nSelectedIndex);
    var bLoopAlreadyChecked = this.getLoopAt(nSelectedIndex).getChecked();
    var bLoopIsMiddle = this.isLoopAMiddle(nSelectedIndex);

    //Case 1: Loop is already checked and is between two other checked loops.
    //Action: clear all checked loops, toggle selected one back on.
    if (bLoopAlreadyChecked && bLoopIsMiddle) {
      // If this loop is already checked, and user clicks check again,
      // clear all checked loops and turn this one back
      this.clearActiveLoops();
      this.getLoopAt(nSelectedIndex).setChecked(true);
    } else if (bLoopAlreadyChecked && !bLoopIsMiddle) {
      //This loop is already checked, but is not a middle meaning it is the end of a range.
      //We simply need to toggle it and not touch the others.
      this.getLoopAt(nSelectedIndex).setChecked(false);
    } else if (!bLoopAlreadyChecked) {
      //Case 2: Loop is being toggled on
      //Actions: Search for loop range to toggle on.
      var previousCheckedLoopIndex = this.findPreviousStackableCheckedLoop(
        nSelectedIndex
      );
      var nextCheckedLoopIndex = this.findNextStackableCheckedLoop(
        nSelectedIndex
      );
      if (previousCheckedLoopIndex >= 0) {
        this.setStackableLoopRange(previousCheckedLoopIndex, nSelectedIndex);
      } else if (nextCheckedLoopIndex >= 0) {
        this.setStackableLoopRange(nSelectedIndex, nextCheckedLoopIndex);
      } else {
        //No other connected checked loops exist. Clear everything
        //and toggle this one on.
        this.clearActiveLoops();
        this.getLoopAt(nSelectedIndex).setChecked(true);
      }
    }
  };

  this.setStackableLoopRange = function(nLowerIndex, nHigherIndex) {
    for (let i = nLowerIndex; i <= nHigherIndex; i++) {
      this.getLoopAt(i).setChecked(true);
    }
  };

  this.findPreviousStackableCheckedLoop = function(startIndex) {
    nFoundIndex = -1;
    for (let i = startIndex - 1; i >= 0; i--) {
      if (this.getLoopAt(i).getChecked() && this.getLoopAt(i).getStackable()) {
        nFoundIndex = i;
      }
    }

    return nFoundIndex;
  };

  this.findNextStackableCheckedLoop = function(startIndex) {
    nFoundIndex = -1;
    var nLength = this.a_Loops.length;

    for (let i = startIndex + 1; i < nLength; i++) {
      if (this.getLoopAt(i).getChecked() && this.getLoopAt(i).getStackable()) {
        nFoundIndex = i;
      }
    }

    return nFoundIndex;
  };

  this.toggleLoopCheckedState = function(nLoopIndex) {
    var isLoopAlreadyChecked = this.getLoopAt(nLoopIndex).getChecked();

    if (isLoopAlreadyChecked && this.isLoopAMiddle(nLoopIndex)) {
      // If this loop is already checked, and user clicks check again,
      // clear all checked loops and turn this one back
      this.clearActiveLoops();
      this.getLoopAt(nLoopIndex).setChecked(true);
    } else {
      this.getLoopAt(nLoopIndex).setChecked(
        !this.getLoopAt(nLoopIndex).getChecked()
      );
      var previousLoopChecked = this.getLoopAt(nLoopIndex).getChecked();

      if (previousLoopChecked) {
        for (let i = nLoopIndex - 1; i >= 0; i--) {
          if (
            !this.getLoopAt(i).getChecked() ||
            !this.getLoopAt(i).getStackable()
          ) {
            previousLoopChecked = false;
          }
          this.getLoopAt(i).setChecked(previousLoopChecked);
        }

        previousLoopChecked = true;

        for (let i = nLoopIndex + 1; i < this.a_Loops.length; i++) {
          if (
            !this.getLoopAt(i).getChecked() ||
            !this.getLoopAt(i).getStackable()
          ) {
            previousLoopChecked = false;
          }
          this.getLoopAt(i).setChecked(previousLoopChecked);
        }
      }
    }
  };

  this.isLoopAMiddle = function(nLoopIndex) {
    var lowerLoop = false;
    var higherLoop = false;

    for (let i = 0; i < this.a_Loops.length; i++) {
      if (this.getLoopAt(i).getChecked() && this.getLoopAt(i).getStackable()) {
        if (i < nLoopIndex) {
          //console.log('Lower selected loop found');
          lowerLoop = true;
        } else if (i > nLoopIndex) {
          //console.log('Higher selected loop found');
          higherLoop = true;
        }
      }
    }

    //console.log('Loop is middle: ' + (lowerLoop && higherLoop));
    return lowerLoop && higherLoop;
  };

  this.computeStackedLoop = function() {
    var loopStart = 0;
    var loopEnd = 0;
    var loopInitialized = false;
    var nLength = this.a_Loops.length;

    for (let i = 0; i < nLength; i++) {
      var theLoop = this.getLoopAt(i);
      if (theLoop.getChecked()) {
        if (!loopInitialized) {
          loopStart = theLoop.getLoopStart();
          loopEnd = theLoop.getLoopEnd();
          loopInitialized = true;
        } else {
          loopStart = Math.min(loopStart, theLoop.getLoopStart());
          loopEnd = Math.max(loopEnd, theLoop.getLoopEnd());
        }
      }
    }

    //console.log("New Loop calculated: " + loopStart + "," + loopEnd);
    if (this.validateLoop(loopStart, loopEnd)) {
      return new InstantLoop("Combined Loop", loopStart, loopEnd);
      //this.theEngine.loadLoop( loopStart, loopEnd );
    } else {
      return null;
      //this.theEngine.stopLooping();
    }
  };

  this.validateLoop = function(loopStart, loopEnd) {
    var loopValid = true;
    if (
      loopStart < 0 ||
      loopStart > loopEnd ||
      loopEnd <= 0 ||
      loopStart == loopEnd
    ) {
      loopValid = false;
    }

    return loopValid;
  };
}

export function InstantLoop(strName, fStartTime, fStopTime) {
  this.str_Name = strName;
  this.f_StartTime = parseFloat(fStartTime);
  this.f_EndTime = parseFloat(fStopTime);
  this.b_Stackable = false;
  this.b_Checked = false;

  if (strName == "") {
    this.str_Name =
      this.f_StartTime.toFixed(2) + " - " + this.f_EndTime.toFixed(2);
  }
  //Setters
  this.setLoopStart = function(fStartTime) {
    this.f_StartTime = parseFloat(fStartTime);
  };
  this.setLoopEnd = function(fEndTime) {
    this.f_EndTime = parseFloat(fStopTime);
  };
  this.setStackable = function(bStackable) {
    this.b_Stackable = bStackable;
  };
  this.setChecked = function(bChecked) {
    this.b_Checked = bChecked;
  };
  this.setName = function(strName) {
    this.str_Name = strName;
  };

  //Getters
  this.getLoopStart = function() {
    return this.f_StartTime;
  };
  this.getLoopEnd = function() {
    return this.f_EndTime;
  };
  this.getStackable = function() {
    return this.b_Stackable;
  };
  this.getChecked = function() {
    return this.b_Checked;
  };
  this.getName = function() {
    return this.str_Name;
  };

  this.toggleChecked = function() {
    let bWasChecked = this.b_Checked;
    this.b_Checked = !bWasChecked;
    return this.b_Checked;
  };
  this.validate = function() {
    if (this.f_EndTime < this.f_StartTime + 0.1) {
      return false;
    }
    return true;
  };
  this.getDefaultName = function() {
    return this.f_StartTime.toFixed(2) + " - " + this.f_EndTime.toFixed(2);
  };
}

export function ProPlayerCommentsManager(parentWraperDivID) {
  this.n_SegmentID = 0;
  this.n_PackageID = 0;
  this.commentsLoadedOnce = false;
  this.b_FilterComments = false;
  this.str_CommentsListWrapperID = "#" + parentWraperDivID;

  this.reset = function() {
    //console.log("Resetting Comments Data");
    this.n_SegmentID = 0;
    this.n_PackageID = 0;
    this.commentsLoadedOnce = false;
    this.b_FilterComments = false;
    $(this.str_CommentsListWrapperID).empty();
  };

  this.setNewPackageAndSegmentIDs = function(nPackageID, nSegmentID) {
    this.reset();
    this.n_PackageID = nPackageID;
    this.n_SegmentID = nSegmentID;
  };

  this.setNewPackageID = function(nPackageID) {
    this.reset();
    this.n_PackageID = nPackageID;
  };

  this.setNewSegmentID = function(nSegmentID) {
    this.n_SegmentID = nSegmentID;
  };

  this.setAuthorCommentFilter = function(bFilter) {
    if (bFilter != this.b_FilterComments) {
      this.b_FilterComments = bFilter;
      this.reloadComments();
    }
  };
  this.reloadComments = function() {
    this.commentsLoadedOnce = true;
    if (this.n_PackageID != "0") {
      $(this.str_CommentsListWrapperID).empty();
      thePlayer.spinner(this.str_CommentsListWrapperID);
      var theURL = gc_BranchPath + "/--ajax-load-comments/";
      theURL += "?package_id=" + this.n_PackageID;

      if (this.n_SegmentID !== "0") {
        theURL += "&segment_id=" + this.n_SegmentID;
      } else {
        theURL += "&segment_id=-1";
      }
      if (this.b_FilterComments) {
        theURL += "&author=yes";
      } else {
        theURL += "&author=no";
      }
      $(this.str_CommentsListWrapperID).load(theURL, function() {
        var cmtList = $(".cmt-wrapper.level-0");
        for (let i = 0; i < cmtList.length; i++) {
          var theKids = $(cmtList[i]).find("li.level-1");
          if (theKids.length > 0) {
            var maxTime = 0;
            for (let j = 0; j < theKids.length; j++) {
              var theTime = $(theKids[j]).data("date");
              maxTime = Math.max(maxTime, theTime);
            }
            $(cmtList[i]).attr("data-last-update", maxTime);
          } else {
            var theTime = $(cmtList[i]).data("date");
            $(cmtList[i]).attr("data-last-update", theTime);
          }
        }

        tinysort("ul#cmts-list>li", { data: "last-update", order: "desc" });
        $("#ask-button").toggleClass("disabled", false);
      });
    } else {
      $("#ask-button").toggleClass("disabled", true);
    }
  };

  this.loadMoreComments = function() {
    var currentOffset = parseInt($("#cmts-list").attr("data-offset"));
    //console.log('Offset is currently ' + currentOffset);
    currentOffset += 2;
    var nextURL =
      gc_BranchPath +
      "/--ajax-comment-list/" +
      this.n_PackageID +
      "/" +
      currentOffset;

    $.get(nextURL, function(data) {
      $("#cmts-list").attr("data-offset", currentOffset);
      $("#cmts-list").append(data);
    });
  };

  /*****************************************
   **********   Comment Functions  **********
   *****************************************/

  this.replyToComment = function(nCommentID) {
    if (nCommentID > 0) {
      var theFormID = "comment-" + nCommentID + "-form";
      var theForm =
        "<div class='comment-reply-form thread-reply-form' id='" +
        theFormID +
        "'></div>";

      var theReplyDiv = "#cmt-" + nCommentID + "-reply-wrapper";
      $(theReplyDiv).after(theForm);

      $("#" + theFormID).html(
        '<div class="text-center"><i class="fa fa-2x fa-spinner fa-spin"></i></div>'
      );

      var theFormURL =
        gc_BranchPath +
        "/--ajax-load-comment-form/?entry_id=" +
        this.n_PackageID;
      theFormURL += "&comment_id=" + nCommentID;
      if (this.n_SegmentID > 0) {
        theFormURL += "&segment_id=" + this.n_SegmentID;
      }

      $("#" + theFormID).load(theFormURL, function() {
        $("#" + theFormID + " form textarea").focus();
      });
      $("#comment-" + nCommentID + "-reply-button").toggleClass(
        "disabled",
        true
      );
    } else {
      var theFormID = "comment-0-form";
      var theForm =
        "<div class='comment-reply-form' id='comment-0-form'></div>";

      $("#add-cmt-wrapper").after(theForm);
      $("#" + theFormID).html(
        '<div class="text-center"><i class="fa fa-2x fa-spinner fa-spin"></i></div>'
      );

      var theFormURL =
        gc_BranchPath +
        "/--ajax-load-comment-form/?entry_id=" +
        this.n_PackageID;
      if (this.n_SegmentID > 0) {
        theFormURL += "&segment_id=" + this.n_SegmentID;
      }

      $("#" + theFormID).load(theFormURL, function() {
        $("#comment-0-form form textarea").focus();
      });

      $("#ask-button").toggleClass("disabled", true);
      $("#no-questions").toggle(false);
    }
  };

  this.submitThreadedCmt = function(sender) {
    $(sender).html('<i class="fa fa-spinner fa-spin"></i> ');

    var theForm = $(sender).closest("form");
    formData = $(theForm).serialize();

    $.ajax({
      type: "POST",
      url: $(theForm).attr("action"),
      data: formData
    }).done(function(response) {
      thePlayer.commentsManager.reloadComments();
    });
  };

  this.deleteCmtForm = function(nCommentID) {
    if (nCommentID) {
      var theCommentID = nCommentID;
      var replyWrapperID = "#comment-" + theCommentID + "-form";
      $(replyWrapperID).remove();

      $("#comment-" + nCommentID + "-reply-button").toggleClass(
        "disabled",
        false
      );
    } else {
      $("#comment-0-form").remove();
      $("#ask-button").toggleClass("disabled", false);
      if ($("#no-questions") != undefined) {
        $("#no-questions").toggle(true);
      }
    }
  };

  this.subscribeAction = function(sender) {
    $.ajax({
      type: "POST",
      url: $(sender).attr("data-action")
    }).done(function(response) {
      thePlayer.commentsManager.reloadComments();
    });
  };

  this.updateCommentFormCharacterCount = function(sender) {
    var text_length = $(sender).val().length;
    var text_remaining = 500 - text_length;
    var updateDiv = $(sender).siblings(".comment-character-counter")[0];
    $(updateDiv).html(text_remaining + " characters remaining");
  };

  this.toggleCmtReplies = function(nCommentID) {
    $("#comment-" + nCommentID + "-wrapper").toggleClass("expanded");
  };

  this.deleteCmt = function(nCommentID, strURL) {
    $.post(strURL, { status: "close", comment_id: nCommentID }, function(data) {
      thePlayer.commentsManager.reloadComments();
    });
  };
}
