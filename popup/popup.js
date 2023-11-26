// const getAllTabsInfo = async (info = ["url", "info", "active"]) => {
//   try {
//     const tabs = await chrome.tabs.query({});

//     const info = tabs.map((tab) => {
//       return { url: tab.url, title: tab.title, active: tab.active };
//     });
//     console.log(info);
//     return info;
//     // You can now use the titles array as needed
//   } catch (error) {
//     console.error("Error fetching tab titles:", error);
//   }
// };

// try {
//   console.log("FROM POPUP");
//   const tabsInfo = await getAllTabsInfo();
//   console.log(tabsInfo);
//   //   console.log(tabTitle);
// } catch (err) {
//   console.log(err);
// }
