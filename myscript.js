// @ts-nocheck
$(document).ready(function () {
  function jsEscape(str) {
    // This method is used to prevent user from XSS (cross-site scripting) attack.
    // NOTE: We are using this method instead of $(selector).text() provided by jQuery becuase of whitespace issue with it. (https://forum.jquery.com/topic/inserting-whitespace-into-a-textnode)

    var tagsToReplace = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;",
    };

    if (typeof str === "string") {
      return str.replace(/[&<>"'`=\/]/g, function (tag) {
        return tagsToReplace[tag];
      });
    } else {
      return str;
    }
  }

  $.ajax({
    url: "https://run.mocky.io/v3/e11e89e4-f328-4d3c-974d-b6707e9f27df", // Mock api (just for testing).
    type: "GET",
    dataType: "json",
    success: function (res) {
      console.log(res);

      // This code generates table from the data provided by this http call.
      const caption = "Codility Table";
      let $table = $("<table><caption>" + caption + "</caption></table>");

      let tr_1 = "<tr><td id='blank_td'></td>";
      res.headers.forEach(function (item, index) {
        tr_1 += "<th scope='col'>" + jsEscape(item) + "</th>";
      });
      tr_1 += "</tr>";
      $table.append(tr_1);

      for (const [key, value] of Object.entries(res.data)) {
        var other_tr = "<tr>";
        other_tr += "<th scope='row'>" + jsEscape(key) + "</th>";
        value.forEach(function (item, index) {
          other_tr += "<td class='my_td'>" + jsEscape(item) + "</td>";
        });
        other_tr += "</tr>";
        $table.append(other_tr);
      }

      $("#my_table").append($table);
    },
    error: function (err) {
      // Error occured.
      console.log(err);
      alert("Something went wrong. Please try again later.");
    },
  });
});
