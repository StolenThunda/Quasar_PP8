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
