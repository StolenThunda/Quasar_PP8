export class ProPlayerBrowser {
  constructor(strWrapperDiv) {
    this.b_BrowserLoaded = false;
    this.strBrowserWrapperID = "#" + strWrapperDiv;
    this.strActiveChannel = "";
    this.n_DependentsToProcess = 0;
    this.n_UpdateTimer = -1;
    this.filterSectionList = new BrowserFilterSectionList(this);
    this.b_IsProcessing = false;
    this.initializeBrowser = function() {};

    /*****************************************
     *** Initialization/Reset Functions  ********
     *****************************************/
    this.openBrowser = function() {};

    this.closeBrowser = function() {
      //console.log('Close Browser Called');
      $(this.strBrowserWrapperID).empty();
      $(this.strBrowserWrapperID).toggle(false);
    };

    this.browserReset = function() {
      $("#filter-level-1 .selected").toggleClass("active", false);
      this.strActiveChannel = "";
      this.browserResetFilters();
      this.resetResults();
      this.n_DependentsToProcess = 0;
      this.filterSectionList.reset();
      this.spinner("results");
      $("#results").load(
        gc_BranchPath + "/--ajax-browser-default-entries/",
        function() {
          thePlayer.browserTool.loadResultsFavoritesForms();
        }
      );
      $("#sidebar-instructions").toggleClass("hidden", false);
    };

    this.resetResults = function() {
      $("#results .row").remove();
      $("#results").empty();
    };

    /*****************************************
     *************  Interface Callbacks  ************
     *****************************************/
    this.browserChannelCallback = function(strChannel, sender) {
      if (this.isProcessing()) {
        //console.log("Previous process has not finished, bailing.");
        return;
      }
      this.initializeProcessing();

      this.strActiveChannel = strChannel;
      this.resetResults();
      //unselect previously selected content type.
      $("ul.browser-top-filter-list li a.active").toggleClass("active", false);

      if (sender) {
        $(sender).toggleClass("active", true);
      }

      this.browserLoadFilters(strChannel);
    };

    this.toggleSearchFilter = function(strFilterID, strSectionID) {
      if (this.isProcessing()) {
        //console.log("Previous process has not finished, bailing.");
        return;
      }
      this.initializeProcessing();

      let theFilterID = "input#" + strFilterID;

      let theSection = $("#browserFilterSection-" + strSectionID);
      //console.log(theSection);
      let bEnableStacking = $(theSection).data("section-stackable") == "yes";

      let sectionType = $(theSection).data("section-type");

      let bWasChecked = $(theFilterID).prop("checked");
      if (bWasChecked == undefined) {
        bWasChecked = false;
      }

      if (bWasChecked && !bEnableStacking) {
        //We are toggling on a checkbox, but stacking is not enabled for this section.
        // We must clear all other checked inputs in this group.
        let theCheckboxes = $(theSection).find("input:checkbox");
        for (let i = 0; i < theCheckboxes.length; i++) {
          if ($(theCheckboxes[i]).attr("id") !== strFilterID) {
            //console.log('Unchecking: ' + $(theCheckboxes[i]).attr('id'));
            $(theCheckboxes[i]).prop("checked", false);
          }
        }
      }

      let filterSectionID = "#filterSection-" + strSectionID;
      let theCheckboxes = $(theSection).find("input:checkbox:checked");
      if (theCheckboxes.length > 0) {
        //console.log("Marking section to have filters on: " + filterSectionID);
        $(filterSectionID).toggleClass("has-filters", true);
      } else {
        $(filterSectionID).toggleClass("has-filters", false);
      }

      this.resetResults();
      this.showResultsLoading();
      this.processDependents(strSectionID);
      this.waitForDependentsToFinishUpdating();
    };

    /*****************************************
     *************   Filtering  ************
     *****************************************/
    this.browserResetFilters = function() {
      $("#sidebarFiltersWrapper form").remove();
    };

    this.browserLoadFilters = function(strChannel) {
      this.browserResetFilters();
      this.spinner("sidebarFiltersWrapper");
      var theURL = gc_BranchPath + "/--ajax-browser-filters/" + strChannel;
      $("#sidebarFiltersWrapper").load(theURL, function() {
        if (strChannel != "youtube") {
          thePlayer.browserTool.submitSearch();
          $("#filterAccordion").foundation();
          thePlayer.browserTool.refreshActiveFilters();
          thePlayer.browserTool.buildFilterSectionData();
        } else {
          thePlayer.browserTool.clearActiveFilters();
          thePlayer.browserTool.finalCleanup();
        }
      });
    };

    this.removeKeywordFilter = function() {
      $("#browserSearchKeywordsReset").toggle(false);
      $("input#browserSearchKeywords").val("");
      this.applyKeywordFilter();
    };

    this.removeActiveFilter = function(strFilterID, strSectionID) {
      //first uncheck the filter because that's what would have happened if we clicked
      // on it.
      $("#" + strFilterID).prop("checked", false);
      this.toggleSearchFilter(strFilterID, strSectionID);
    };

    this.clearActiveFilters = function() {
      $("#activeFiltersWrapper").html("");
      $("#activeFiltersWrapper").toggleClass("hidden", true);
    };
    this.refreshActiveFilters = function() {
      //console.log("Refreshing Active Filters");
      let filtersString = "";
      let sections = $("ul#filterAccordion li.accordion-item");

      for (let i = 0; i < sections.length; i++) {
        let sectionTitle = $(sections[i])
          .children("a.accordion-title")
          .first()
          .text();
        let sectionID = $(sections[i]).data("section-id");
        let checkedFilters = $(sections[i]).find("input:checkbox:checked");
        if (checkedFilters.length > 0) {
          filtersString +=
            "<span class='active-filter-group'><span class='active-filter-group-title'>";
          filtersString += sectionTitle + ":</span> ";
          for (let j = 0; j < checkedFilters.length; j++) {
            filtersString +=
              "<a class='active-filter-item' onClick='thePlayer.browserTool.removeActiveFilter(\"";
            filtersString += $(checkedFilters[j]).attr("id");
            filtersString += '", ';
            filtersString += '"' + sectionID + "\"); return false;'>";
            filtersString += $(checkedFilters[j])
              .siblings("label")
              .first()
              .text();
            filtersString += " <i class='fa fa-times-circle'></i></a>";
          }
          filtersString += "</span>";
        }
      }

      let strKeywords = $("input#browserSearchKeywords").val();

      if (strKeywords != "") {
        filtersString +=
          "<span class='active-filter-group'><span class='active-filter-group-title'>";
        filtersString += "Keywords:</span> ";
        filtersString +=
          "<a class='active-filter-item' onClick='thePlayer.browserTool.removeKeywordFilter(); return false;'>";
        filtersString += strKeywords;
        filtersString += " <i class='fa fa-times-circle'></i></a>";
        filtersString += "</span>";
      }

      if (filtersString == "") {
        filtersString +=
          "<span class='active-filter-group'><span class='active-filter-group-title'>";
        filtersString += "Showing: All</span>";
        filtersString += "</span>";
      }
      $("#activeFiltersWrapper").removeClass("hidden");
      $("#activeFiltersWrapper").html(filtersString);
    };

    /*****************************************
     *************  Search Results   ************
     *****************************************/
    this.resetSearch = function() {
      $("input:checkbox").prop("checked", false);
      $(".has-filters").removeClass("has-filters");
      this.refreshActiveFilters();
      this.submitSearch();
    };

    this.submitSearch = function() {
      var theForm = $("form#searchForm");
      formData = $(theForm).serialize();
      //console.log(formData);
      $.ajax({
        type: "POST",
        url: $(theForm).attr("action"),
        data: formData
      }).done(function(response) {
        $("#results").html(response);
        thePlayer.browserTool.finalCleanup();
        thePlayer.browserTool.loadResultsFavoritesForms();
      });
    };

    this.applyKeywordFilter = function() {
      let theKeywords = $("input#browserSearchKeywords").val();
      if (theKeywords != "") {
        $("#browserSearchKeywordsReset").toggle(true);
      }
      this.refreshActiveFilters();
      this.showResultsLoading();
      this.submitSearch();
    };

    this.doYouTubeSearch = function() {
      if (this.isProcessing()) {
        //console.log("Previous process has not finished, bailing.");
        return;
      }
      this.initializeProcessing();

      let searchPath = gc_BranchPath + "/--ajax-browser-search-youtube/";
      let searchKeywords = $("input#browserSearchKeywords").val();
      if (searchKeywords != "") {
        let searchURL = encodeURI(searchPath + searchKeywords);
        this.resetResults();
        this.showResultsLoading();
        $("#results").load(searchURL, function() {
          thePlayer.browserTool.finalCleanup();
        });
      }
    };

    this.goToResultsPage = function(resultsURL) {
      if (this.isProcessing()) {
        //console.log("Previous process has not finished, bailing.");
        return;
      }
      this.initializeProcessing();

      this.resetResults();
      this.spinner("results");
      $("#results").load(resultsURL, function() {
        thePlayer.browserTool.finalCleanup();
        thePlayer.browserTool.loadResultsFavoritesForms();
      });
    };

    this.nextYouTubeResultsPage = function(strSearchTerm, offsetNumber) {
      if (this.isProcessing()) {
        //console.log("Previous process has not finished, bailing.");
        return;
      }
      this.initializeProcessing();

      this.resetResults();
      this.showResultsLoading();
      var strNextURL = gc_BranchPath + "/";
      strNextURL += "--ajax-browser-search-youtube/";
      strNextURL += strSearchTerm + "/";
      strNextURL += offsetNumber;

      var strNextURL = encodeURI(strNextURL);
      $("#results").load(strNextURL, function() {
        thePlayer.browserTool.finalCleanup();
      });
    };

    /*****************************************
     ******   Dependency Functions  **********
     *****************************************/
    this.buildFilterSectionData = function() {
      this.filterSectionList.reset();

      let allSections = $("ul.filter-list");
      for (let i = 0; i < allSections.length; i++) {
        let newSectionObject = new BrowserFilterSection();
        newSectionObject.setSectionID($(allSections[i]).data("section-id"));
        newSectionObject.setSectionType($(allSections[i]).data("section-type"));
        newSectionObject.setSectionDOMID(
          "#browserFilterSection-" + $(allSections[i]).data("section-id")
        );
        newSectionObject.setChannelID(
          $(allSections[i]).data("section-channel-id")
        );
        newSectionObject.setGroupID($(allSections[i]).data("section-group-id"));

        let tmpDependenciesArray = null;
        let tmpDependenciesString = $(allSections[i]).data(
          "section-dependencies"
        );
        if (tmpDependenciesString != "") {
          tmpDependenciesArray = tmpDependenciesString.split("|");
        } else {
          tmpDependenciesArray = [];
        }

        newSectionObject.setParentIDs(tmpDependenciesArray);
        this.filterSectionList.addSection(newSectionObject);
      }

      this.filterSectionList.computeSectionFamilies();
    };

    this.processDependents = function({ strMasterSectionID, list, status }) {
      /*
        #Order Of Operations
        
        1. Get an array of dependencies for the master section being changed.
        2. Update each of those dependent sections.
          a. Scan through the sections each dependent section is dependent on.
          b. Get a list of all enabled inputs.
          c. Create the update url and update from that.
      */
      let theSection = list.getSectionByID(strMasterSectionID);
      let theChildren = theSection.getChildren();
      //If there aren't any dependents found, there's nothing to do
      if (theChildren.length == 0) {
        return;
      }

      this.n_DependentsToProcess = theChildren.length;
      list.rebuildFilterSectionKeys(status);

      for (let i = 0; i < theChildren.length; i++) {
        let childParents = theChildren[i].getParents();
        //initialize our tag and category filter strings
        let theTagKeys = "";
        let theCategoryKeys = "";

        //cycle through all sections we depend on and collect any checked input values.
        for (let j = 0; j < childParents.length; j++) {
          let theKeyIDsString = childParents[j].getKeyString();
          let theKeyType = childParents[j].getSectionType();
          if (theKeyType == "tag") {
            theTagKeys += theKeyIDsString;
          } else {
            theCategoryKeys += theKeyIDsString;
          }
        }

        // Check if any of the key strings is empty and set it to -1,
        // otherwise trim the last | off the end;
        if (theTagKeys == "") {
          theTagKeys = "-1";
        }
        if (theCategoryKeys == "") {
          theCategoryKeys = "-1";
        }

        /*
          Now we have a list of categories and tags to key on (from all sections we
          depend on. We are ready to construct a url to send to the refiner.
        */
        if (theTagKeys !== "-1" || theCategoryKeys !== "-1") {
          let theURL = "/--ajax-browser-filter-refiner/";
          theURL += theChildren[i].getSectionID() + "/"; //what is the ID of the section we're updating
          theURL += theChildren[i].getSectionType() + "/"; //what type of items are we retrieving (cats or tags)
          theURL += theChildren[i].getChannelID() + "/"; //what channel are we looking at
          theURL += theChildren[i].getGroupID() + "/"; //what is the group (cat or tag) that we are filtering
          theURL += theCategoryKeys + "/"; //what are the categories we have to match
          theURL += theTagKeys + "/"; //what are the tags we have to match

          // debugger;
          // $.get(theURL, function(data) {
          //   let theDependent = JSON.parse(data);
          //   thePlayer.browserTool.processDependentFilterSection(theDependent);
          // });
          return theURL;
        } else {
          // this.restoreFilterSection( theChildren[i].getSectionID() );
        }
      }
    };

    this.processDependentFilterSection = function(dependentObject) {
      let theIDs = dependentObject.ids;
      let theSectionID = dependentObject.sectionID;
      let theInputs = $("#browserFilterSection-" + theSectionID).find(
        "input:checkbox"
      );
      for (let i = 0; i < theInputs.length; i++) {
        let theInputID = $(theInputs[i]).val();
        let theIndex = theIDs.indexOf(parseInt(theInputID));
        if (theIndex == -1) {
          $(theInputs[i]).prop("checked", false);
          $(theInputs[i])
            .closest("li")
            .toggleClass("hidden", true);
          $(theInputs[i])
            .closest("li")
            .toggleClass("visible", false);
        } else {
          //console.log("Input WAS found in matching IDs");
          $(theInputs[i])
            .closest("li")
            .toggleClass("hidden", false);
          $(theInputs[i])
            .closest("li")
            .toggleClass("visible", true);
        }
      }
      let theFilters = $("#browserFilterSection-" + theSectionID).find(
        "li.filter.visible"
      );

      if (theFilters.length == 0) {
        $("#browserFilterSection-" + theSectionID)
          .closest(".accordion-item")
          .toggleClass("has-filters", false);
        $("#browserFilterSection-" + theSectionID)
          .closest(".accordion-item")
          .hide();
      } else {
        $("#browserFilterSection-" + theSectionID)
          .closest(".accordion-item")
          .show();
      }
      this.dependentFinishedUpdating(theSectionID);
    };

    this.dependentFinishedUpdating = function(strSectionID) {
      this.n_DependentsToProcess--;
    };

    this.waitForDependentsToFinishUpdating = function() {
      if (this.n_DependentsToProcess > 0) {
        this.n_UpdateTimer = setTimeout(function() {
          thePlayer.browserTool.waitForDependentsToFinishUpdating();
        }, 100);
        return;
      }
      clearTimeout(this.n_UpdateTimer);
      this.n_UpdateTimer = -1;
      this.submitSearch();
      this.refreshActiveFilters();
    };

    this.restoreFilterSection = function(strSectionID) {
      let theSection = $("#browserFilterSection-" + strSectionID);
      let theInputs = $(theSection).find("input:checkbox");
      for (let i = 0; i < theInputs.length; i++) {
        $(theInputs[i])
          .closest("li")
          .toggleClass("hidden", false);
        $(theInputs[i])
          .closest("li")
          .toggleClass("visible", true);
      }

      $(theSection)
        .closest(".accordion-item")
        .show();
      this.dependentFinishedUpdating(strSectionID);
    };

    /*****************************************
     *************   Fav Forms Loading  ************
     *****************************************/
    this.reloadResultsFavoritesForms = function() {
      let theResults = $(".browser-result-fav-wrapper.fav-enabled");
      let theIDs = "";
      for (let i = 0; i < theResults.length; i++) {
        $(theResults[i]).empty();
      }

      this.loadResultsFavoritesForms();
    };
    this.loadResultsFavoritesForms = function() {
      let theResults = $(".browser-result-fav-wrapper.fav-enabled");
      let theIDs = "";
      for (let i = 0; i < theResults.length; i++) {
        theIDs += $(theResults[i]).data("entry-id");
        if (i != theResults.length - 1) {
          theIDs += "|";
        }
      }

      let theURL = gc_BranchPath + "/--ajax-browser-load-favorite-forms/";
      theURL += theIDs;

      $.get(theURL, function(data) {
        let theFavorites = JSON.parse(data);
        thePlayer.browserTool.pushResultsFavoritesForms(theFavorites);
      });
    };

    this.pushResultsFavoritesForms = function(arrFavorites) {
      let theForms = arrFavorites.formsArray;
      for (let i = 0; i < theForms.length; i++) {
        let theEntryID = theForms[i].itemID;
        let theItem = $("#favWrapper-" + theEntryID);
        $(theItem).html(theForms[i].itemForm);

        let theMetaID = "#browserResultItem-" + theEntryID;
        if (theForms[i].itemChapters != "" && theForms[i].itemChapters != "0") {
          $(theMetaID).toggleClass("has-chapters", true);
        } else {
          $(theMetaID).toggleClass("has-chapters", false);
        }
        if (theForms[i].itemLoops != "" && theForms[i].itemLoops != "0") {
          $(theMetaID).toggleClass("has-loops", true);
        } else {
          $(theMetaID).toggleClass("has-loops", false);
        }
        if (
          theForms[i].itemUserLoops != "" &&
          theForms[i].itemUserLoops != "0"
        ) {
          $(theMetaID).toggleClass("has-user-loops", true);
        } else {
          $(theMetaID).toggleClass("has-user-loops", false);
        }
      }
    };

    this.initializeProcessing = function() {
      //console.log("Initializing Processing.");
      this.b_IsProcessing = true;
      $("#browser-wrapper").toggleClass("updating", true);
    };

    this.isProcessing = function() {
      return this.b_IsProcessing;
    };
    this.finalCleanup = function() {
      // this function should only be called when all operations are done
      // 1. Filters are loaded.
      // 2. Results are loaded
      //console.log("Finished Processing.");
      this.b_IsProcessing = false;
      $("#browser-wrapper").toggleClass("updating", false);
    };
    this.toggleFavoriteInBrowser = function(sender) {
      //console.log('Submitting Favorite');
      var formID = $(sender).closest("form.submitFavoriteForm");
      courseID = $(formID).attr("data-id");
      formData = $(formID).serialize();
      badgeWrapperID = $(formID)
        .closest(".browser-result-fav-wrapper")
        .attr("id");
      $("#" + badgeWrapperID + " button").html(
        '<i class="fa fa-spinner fa-spin fa-2x"></i>'
      );
      $.ajax({
        type: "POST",
        url: $(formID).attr("action"),
        data: formData
      }).done(function(response) {
        $("#" + badgeWrapperID).load(
          gc_BranchPath + "/--ajax-browser-favorite-entry/" + courseID
        );
      });
    };

    /*****************************************
     *****   Misc Display Functions  *********
     *****************************************/
    this.spinner = function(elementID) {
      var strSpinner =
        "<div id='spinner'><i class='fa fa-spinner fa-spin fa-2x'></i></div>";
      $("#" + elementID).html(strSpinner);
    };

    this.showResultsLoading = function() {
      this.spinner("results");
    };

    this.browserDisplayInstructions = function(nCode) {
      var strMessage = "<div class='browser-message'>";

      if (nCode == 0) {
        // Nothing selected
        strMessage += "Pick a type of content from the choices above.";
      } else if (nCode == 1) {
        // Tag Group Selected
        strMessage += "Choose a tag.";
      } else if (nCode == 2) {
        // Category Group Selected
        strMessage += "Choose a category.";
      } else if (nCode == 3) {
        // Search Selected
        strMessage += "Enter a search keyword.";
      }

      strMessage += "</div>";
      $("#results").html(strMessage);
    };
  }
}
export class BrowserFilterSectionList {
  constructor(browserTool) {
    this.theBrowser = browserTool;
    this.a_Sections = [];

    this.reset = function() {
      this.a_Sections = [];
    };

    this.addSection = function(objSection) {
      this.a_Sections.push(objSection);
    };

    this.computeSectionFamilies = function() {
      // First, compute parents based on Parents ID array used when creating each section.
      for (let i = 0; i < this.a_Sections.length; i++) {
        let theSection = this.a_Sections[i];
        let theParentIDs = theSection.getParentIDs();
        for (let j = 0; j < theParentIDs.length; j++) {
          theSection.addParent(this.getSectionByID(theParentIDs[j]));
        }
      }

      //Now that parents are all setup, add the children.
      for (let i = 0; i < this.a_Sections.length; i++) {
        let theSection = this.a_Sections[i];
        let theParents = theSection.getParents();
        for (let j = 0; j < theParents.length; j++) {
          theParents[j].addChild(theSection);
        }
      }
    };

    this.getSectionByID = function(strSectionID) {
      let theMatchingIndex = -1;
      for (let i = 0; i < this.a_Sections.length; i++) {
        if (this.a_Sections[i].getSectionID() == strSectionID) {
          theMatchingIndex = i;
          break;
        }
      }
      return this.a_Sections[theMatchingIndex];
    };

    // any checked inputs into an array with that section
    this.rebuildFilterSectionKeys = function(currentStatus) {
      // currentStatus is the the current state of the browser store
      for (let i = 0; i < this.a_Sections.length; i++) {
        // extract sub array of currentstatus to rebuild the section keys
        let sectionStatuses = [];
        let currentSectionId = this.a_Sections[i].getSectionID();
        Object.entries(currentStatus).forEach(([key, value]) => {
          if (key.startsWith(currentSectionId)) {
            // console.log(`${key}: ${value}`);
            if (value) {
              let obj = {};
              obj[key] = value;
              sectionStatuses.push(obj);
            }
          }
        });
        if (sectionStatuses.length)
          this.a_Sections[i].rebuildKeys(sectionStatuses);
      }
    };
  }
}
export class BrowserFilterSection {
  constructor() {
    this.str_SectionID = "";
    this.str_SectionType = "";
    this.str_ChannelID = 0;
    this.str_GroupID = "";
    this.sectionDOMID = "";
    this.a_ParentIDs = [];
    this.a_Children = []; //sections that key off of me
    this.a_Parents = []; // sections that I key off of
    this.a_Keys = [];

    this.reset = function() {
      this.str_SectionType = "";
      this.str_ChannelID = 0;
      this.str_GroupID = "";
      this.sectionDOMID = "";
      this.a_ParentIDs = [];
      this.a_Children = []; //sections that key off of me
      this.a_Parents = []; // sections that I key off of
      this.a_Keys = [];
    };

    this.setSectionID = function(strID) {
      this.str_SectionID = strID;
    };
    this.setSectionDOMID = function(strID) {
      this.sectionDOMID = strID;
    };
    this.setSectionType = function(strType) {
      this.str_SectionType = strType;
    };
    this.setChannelID = function(strID) {
      this.str_ChannelID = strID;
    };
    this.setGroupID = function(strID) {
      this.str_GroupID = strID;
    };

    this.getSectionID = function() {
      return this.str_SectionID;
    };
    this.getSectionDOMID = function() {
      return this.sectionDOMID;
    };
    this.getSectionType = function() {
      return this.str_SectionType;
    };
    this.getChannelID = function() {
      return this.str_ChannelID;
    };
    this.getGroupID = function() {
      return this.str_GroupID;
    };

    this.setParentIDs = function(aParentIDs) {
      this.a_ParentIDs = aParentIDs;
    };
    this.getParentIDs = function() {
      return this.a_ParentIDs;
    };

    this.getChildren = function() {
      return this.a_Children;
    };
    this.addChild = function(objChild) {
      this.a_Children.push(objChild);
    };

    this.getParents = function() {
      return this.a_Parents;
    };
    this.addParent = function(objParent) {
      this.a_Parents.push(objParent);
    };

    this.getKeyString = function() {
      let theKeyString = "";
      for (let i = 0; i < this.a_Keys.length; i++) {
        theKeyString += this.a_Keys[i];
        if (i < this.a_Keys.length - 1) {
          theKeyString += "|";
        }
      }

      return theKeyString;
    };

    this.resetKeys = function() {
      this.a_Keys = [];
    };

    this.addKey = function(strKey) {
      this.a_Keys.push(strKey);
    };

    this.rebuildKeys = function(sectionStatuses) {
      this.resetKeys();
      console.log("sStat", sectionStatuses);

      // let tmpInputList = $(this.sectionDOMID).find('input:checkbox:checked');
      for (let i = 0; i < sectionStatuses.length; i++) {
        let status = sectionStatuses[i];
        let key = Object.keys(status)[0];
        let val = parseInt(key.match(/\d+$/)[0]);
        this.addKey(val);
      }
    };
  }
}
export class CommentsManager {
  constructor(parentWraperDivID) {
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
      $.post(strURL, { status: "close", comment_id: nCommentID }, function(
        data
      ) {
        thePlayer.commentsManager.reloadComments();
      });
    };
  }
}
export class LoopsManager {
  constructor() {
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
}
export class LoopsCollection {
  constructor(nCollectionID, strListWrapperID, strCollectionRole, bEditable) {
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
            loopItem +=
              collectionID + "," + listIndex + "," + loopIndex + ')">';
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
            loopItem +=
              collectionID + "," + listIndex + "," + loopIndex + ')">';
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
}
export class LoopsList {
  constructor(nCollectionID, nListID, strListTitle) {
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
        if (
          this.getLoopAt(i).getChecked() &&
          this.getLoopAt(i).getStackable()
        ) {
          nFoundIndex = i;
        }
      }

      return nFoundIndex;
    };

    this.findNextStackableCheckedLoop = function(startIndex) {
      nFoundIndex = -1;
      var nLength = this.a_Loops.length;

      for (let i = startIndex + 1; i < nLength; i++) {
        if (
          this.getLoopAt(i).getChecked() &&
          this.getLoopAt(i).getStackable()
        ) {
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
        if (
          this.getLoopAt(i).getChecked() &&
          this.getLoopAt(i).getStackable()
        ) {
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
}
export class InstantLoop {
  constructor(strName, fStartTime, fStopTime) {
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
}

export class Segment {
  constructor() {
    this.b_IsLoaded = false;
    this.str_Title = "";
    this.str_SegmentType = ""; // Must be "entry" or "other"
    this.str_PrimaryMediaType = ""; // must be vimeo, youtube, mp3, soundslice, url
    this.str_EntryID = ""; //this must be a valid TXBA Media Segment Entry ID
    this.str_VimeoCode = "";
    this.str_YouTubeCode = "";
    this.str_MP3Filename = "";
    this.str_SoundSliceCode = "";
    this.str_PDFFilename = "";
    this.str_MediaURL = "";
    this.f_MediaStartTime = 0;
    this.str_GPXFilename = "";
    this.str_DisplayName = "";
    this.str_FullDisplayName = "";
    this.str_FacebookUser = "";
    this.str_FacebookVideoCode = "";
    this.str_InstagramID = "";
    this.str_HTMLContent = "";
    this.a_ChaptersArray = [];
    this.a_LoopsArray = [];
    this.str_YTMatchingEntryID = "";
    this.str_Description = "";
    this.a_UserLoopEntryIDs = [];

    this.setIsLoaded = function(bLoaded) {
      this.b_IsLoaded = bLoaded;
      return this
    };
    this.setEntryID = function(strEntryID) {
      this.str_EntryID = strEntryID;
      return this
    };
    this.setYTMatchingEntryID = function(strYTMatchingEntryID) {
      this.str_YTMatchingEntryID = strYTMatchingEntryID;
      return this
    };
    this.setSegmentType = function(strType) {
      this.str_SegmentType = strType;
      return this
    };
    this.setPrimaryMediaType = function(strMediaType) {
      this.str_PrimaryMediaType = strMediaType;
      return this
    };
    this.setVimeoCode = function(strVimeoCode) {
      this.str_VimeoCode = strVimeoCode;
      return this
    };
    this.setYouTubeCode = function(strYouTubeCode) {
      this.str_YouTubeCode = strYouTubeCode;
      return this
    };
    this.setMP3Filename = function(strMP3Filename) {
      this.str_MP3Filename = strMP3Filename;
      return this
    };
    this.setSoundSliceCode = function(strSoundSliceCode) {
      this.str_SoundSliceCode = strSoundSliceCode;
      return this
    };
    this.setPDFFilename = function(strPDFFilename) {
      this.str_PDFFilename = strPDFFilename;
      return this
    };
    this.setMediaURL = function(strURL) {
      this.str_URL = strURL;
      return this
    };
    this.setGPXFilename = function(strGPXFilename) {
      this.str_GPXFilename = strGPXFilename;
      return this
    };
    this.setTitle = function(strTitle) {
      this.str_Title = strTitle;
      return this
    };
    this.setDisplayName = function(strDisplayName) {
      this.str_DisplayName = strDisplayName;
      return this
    };
    this.setFullDisplayName = function(strFullDisplayName) {
      this.str_FullDisplayName = strFullDisplayName;
      return this
    };
    this.setChaptersArray = function(aChaptersArray) {
      this.a_ChaptersArray = aChaptersArray;
      return this
    };
    this.setLoopsArray = function(aLoopsArray) {
      this.a_LoopsArray = aLoopsArray;
      return this
    };
    this.setFacebookUser = function(strUser) {
      this.str_FacebookUser = strUser;
      return this
    };
    this.setFacebookVideoCode = function(strCode) {
      this.str_FacebookVideoCode = strCode;
      return this
    };
    this.setInstagramID = function(strID) {
      this.str_InstagramID = strID;
      return this
    };
    this.setHTMLContent = function(strHTML) {
      this.str_HTMLContent = strHTML;
      return this
    };
    this.setMediaStartTime = function(fTime) {
      this.f_MediaStartTime = fTime;
      return this
    };
    this.setDescription = function(strDescription) {
      this.str_Description = strDescription;
      return this
    };

    this.isLoaded = function() {
      return this.b_IsLoaded;
    };
    this.getEntryID = function() {
      return this.str_EntryID;
    };
    this.getYTMatchingEntryID = function() {
      return this.str_YTMatchingEntryID;
    };
    this.getSegmentType = function() {
      return this.str_SegmentType;
    };
    this.getPrimaryMediaType = function() {
      return this.str_PrimaryMediaType;
    };
    this.getVimeoCode = function() {
      return this.str_VimeoCode;
    };
    this.getYouTubeCode = function() {
      return this.str_YouTubeCode;
    };
    this.getMP3Filename = function() {
      return this.str_MP3Filename;
    };
    this.getSoundSliceCode = function() {
      return this.str_SoundSliceCode;
    };
    this.getPDFFilename = function() {
      return this.str_PDFFilename;
    };
    this.getMediaURL = function() {
      return this.str_URL;
    };
    this.getGPXFilename = function() {
      return this.str_GPXFilename;
    };
    this.getTitle = function() {
      return this.str_Title;
    };
    this.getDisplayName = function() {
      return this.str_DisplayName;
    };
    this.getFullDisplayName = function() {
      return this.str_FullDisplayName;
    };
    this.getChaptersArray = function() {
      return this.a_ChaptersArray;
    };
    this.getLoopsArray = function() {
      return this.a_LoopsArray;
    };
    this.getFacebookUser = function() {
      return this.str_FacebookUser;
    };
    this.getFacebookVideoCode = function() {
      return this.str_FacebookVideoCode;
    };
    this.getInstagramID = function() {
      return this.str_InstagramID;
    };
    this.getHTMLContent = function() {
      return this.str_HTMLContent;
    };
    this.getMediaStartTime = function() {
      return this.f_MediaStartTime;
    };
    this.getDescription = function() {
      return this.str_Description;
    };

    this.resetAll = function() {
      this.b_IsLoaded = false;
      this.str_Title = "";
      this.str_SegmentType = ""; // Must be "entry" or "other"
      this.str_PrimaryMediaType = ""; // must be vimeo, youtube, mp3, soundslice, url
      this.str_EntryID = ""; //this must be a valid TXBA Media Segment Entry ID
      this.str_YTMatchingEntryID = "";
      this.str_VimeoCode = "";
      this.str_YouTubeCode = "";
      this.str_MP3Filename = "";
      this.str_SoundSliceCode = "";
      this.str_PDFFilename = "";
      this.str_MediaURL = "";
      this.str_GPXFilename = "";
      this.str_StartTime = "";
      this.str_DisplayName = "";
      this.str_FullDisplayName = "";
      this.str_FacebookUser = "";
      this.str_FacebookVideoCode = "";
      this.str_HTMLContent = "";
      this.a_ChaptersArray.length = 0;
      this.a_LoopsArray.length = 0;
      this.str_Description = "";
    };
    this.allowUserData = function() {
      let bAllowUserData = false;
      if (
        this.getSegmentType() == "entry" && //It must be an entry
        this.getEntryID() != "" && //the entryID must be set.
        (this.getPrimaryMediaType() == "vimeo" || //It must either be Vimeo
        this.getPrimaryMediaType() == "youtube" || //or YouTube
          this.getPrimaryMediaType() == "mp3")
      ) {
        //or an MP3
        bAllowUserData = true;
      }
      return bAllowUserData;
    };

    this.allowChapters = function() {
      let bAllowUserData = false;
      if (
        this.getSegmentType() == "entry" && //It must be an entry
        this.getEntryID() != "" && //the entryID must be set.
        (this.getPrimaryMediaType() == "vimeo" || //It must either be Vimeo
        this.getPrimaryMediaType() == "youtube" || //or YouTube
          this.getPrimaryMediaType() == "mp3")
      ) {
        //or an MP3
        bAllowUserData = true;
      }
      return bAllowUserData;
    };

    this.allowLoops = function() {
      let bAllowUserData = false;
      if (
        this.getSegmentType() == "entry" && //It must be an entry
        this.getEntryID() != "" && //the entryID must be set.
        (this.getPrimaryMediaType() == "vimeo" || //It must either be Vimeo
        this.getPrimaryMediaType() == "youtube" || //or YouTube
          this.getPrimaryMediaType() == "mp3")
      ) {
        //or an MP3
        bAllowUserData = true;
      }
      return bAllowUserData;
    };

    this.allowImport = function() {
      let bAllowImport = false;
      if (
        this.getSegmentType() == "other" && //It must NOT be an entry
        this.getEntryID() == "" && //the entryID must be blank
        this.getPrimaryMediaType() == "youtube"
      ) {
        //it MUST be a Youtube video.
        bAllowImport = true;
      }
      return bAllowImport;
    };

    this.inferMediaType = function() {
      if (this.getVimeoCode() !== "") {
        this.setPrimaryMediaType("vimeo");
      } else if (this.getYouTubeCode() !== "") {
        this.setPrimaryMediaType("youtube");
      } else if (this.getFacebookVideoCode() !== "") {
        this.setPrimaryMediaType("facebook");
      } else if (this.getInstagramID() !== "") {
        this.setPrimaryMediaType("instagram");
      } else if (this.getMP3Filename() !== "") {
        this.setPrimaryMediaType("mp3");
      } else if (this.getSoundSliceCode() !== "") {
        this.setPrimaryMediaType("soundslice");
      } else if (this.getPDFFilename() !== "") {
        this.setPrimaryMediaType("pdf");
      } else if (this.getMediaURL() !== "") {
        this.setPrimaryMediaType("url");
      } else {
        this.setPrimaryMediaType("html");
      }
    };

    this.setUserLoopsEntryIDsFromString = function(strUserLoopEntryIDs) {
      let theIDs = strUserLoopEntryIDs.split("|");
      for (let i = 0; i < theIDs.length; i++) {
        if (theIDs[i] !== "") {
          this.a_UserLoopEntryIDs.push(theIDs[i]);
        }
      }
    };

    this.getUserLoopsEntryIDs = function() {
      return this.a_UserLoopEntryIDs;
    };

    this.getUserLoopEntryIDsCount = function() {
      return this.a_UserLoopEntryIDs.length;
    };
  }
}

export class Package {
  constructor() {
    this.str_PackageType = ""; // must be "entry" or "other"
    this.b_Loaded = false;
    this.str_EntryID = "";
    this.str_Title = "";
    this.str_ChannelName = "";
    this.str_ChannelShortName = "";
    this.str_DefaultSegmentEntryID = "";
    this.str_Description = "";
    this.str_Overview = "";
    this.str_ImageURL = "";
    this.str_Tuning = "";
    this.a_Sections = [];
    this.str_Date = "";
    this.str_ErrorMessage = "";

    this.setPackageType = function ( strType ) {
      this.str_PackageType = strType;
      return this
    };
    this.setLoaded = function ( bLoaded ) {
      this.b_Loaded = bLoaded;
      return this
    };
    this.setEntryID = function ( nEntryID ) {
      this.str_EntryID = nEntryID;
      return this
    };
    this.setTitle = function ( strTitle ) {
      this.str_Title = strTitle;
      return this
    };
    this.setChannelName = function ( strChannelName ) {
      this.str_ChannelName = strChannelName;
      return this
    };
    this.setChannelShortName = function ( strChannelShortName ) {
      this.str_ChannelShortName = strChannelShortName;
      return this
    };
    this.setDefaultSegmentEntryID = function ( strEntryID ) {
      this.str_DefaultSegmentEntryID = strEntryID;
      return this
    };
    this.setDescription = function ( strDescription ) {
      this.str_Description = strDescription;
      return this
    };
    this.setOverview = function ( strOverview ) {
      this.str_Overview = strOverview;
      return this
    };
    this.setImageURL = function ( strImageURL ) {
      this.str_ImageURL = strImageURL;
      return this
    };
    this.setSections = function ( objSections ) {
      this.a_Sections = objSections;
      return this
    };
    this.setDate = function ( strDate ) {
      this.str_Date = strDate;
      return this
    };
    this.setErrorMessage = function ( strError ) {
      this.str_ErrorMessage = strError;
      return this
    };
    this.setTuning = function ( strTuning ) {
      this.str_Tuning = strTuning;
      return this
    };

    this.getPackageType = function () {
      return this.str_PackageType;
    };
    this.isLoaded = function () {
      return this.b_Loaded;
    };
    this.getEntryID = function () {
      return this.str_EntryID;
    };
    this.getTitle = function () {
      return this.str_Title;
    };
    this.getChannelName = function () {
      return this.str_ChannelName;
    };
    this.getChannelShortName = function () {
      return this.str_ChannelShortName;
    };
    this.getDefaultSegmentEntryID = function () {
      return this.str_DefaultSegmentEntryID;
    };
    this.getDescription = function () {
      return this.str_Description;
    };
    this.getOverview = function () {
      return this.str_Overview;
    };
    this.getImageURL = function () {
      return this.str_ImageURL;
    };
    this.getSections = function () {
      return this.a_Sections;
    };
    this.getDate = function () {
      return this.str_Date;
    };
    this.getErrorMessage = function () {
      return this.str_ErrorMessage;
    };
    this.getTuning = function () {
      return this.str_Tuning;
    };

    this.resetAll = function () {
      this.str_PackageType = ""; // must be "entry" or "other"
      this.b_Loaded = false;
      this.str_EntryID = "";
      this.str_Title = "";
      this.str_ChannelName = "";
      this.str_ChannelShortName = "";
      this.str_DefaultSegmentEntryID = "";
      this.str_Description = "";
      this.str_Overview = "";
      this.str_ImageURL = "";
      this.a_Sections = [];
      this.str_Date = "";
      this.str_ErrorMessage = "";
    };

    this.isEntry = function () {
      return this.str_PackageTYpe == "entry";
    };

    this.hasSections = function () {
      return this.a_Sections.length > 0;
    };
  }
}
