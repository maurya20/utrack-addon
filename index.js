/* Declare a constant that contains a login of the target github user */

const USER_NAME = 'Sid9699';

/* The following renderUserDetails(user) function creates and inserts the user profile data into the DOM */

function renderUserDetails(user) {
    const container = document.getElementById('user-details');

    container.innerHTML = `
    <img src=${user.avatar_url} class="user-avatar"/>
    <h4>${user.name} aka <a href="${user.html_url}">${user.login}</a></h4>
    <div>
    <div>Followers: ${user.followers}</div>
    <div>Repos: ${user.public_repos}</div>
    `;
}

/* The following function actually retrieves the data from GitHub using the GitHub API.
    It uses the Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) */

function loadAndRenderUser(userLogin) {
    return fetch(`https://api.github.com/users/${userLogin}`)
        .then(response => {
            return response.ok ? response.json() : new Error(response);
        })
        .then(user => {
            console.log(user)
            renderUserDetails(user);
            return user;
        })
        .catch(err => console.warn(err));
}

/* The last step is to register the widget in the dashboard and initiate loading the user data.
    Also, this block defines displayed widget title and adds the refresh button.
    When you click the refresh button, the script will reload and re-render the user profile data.
    We use Dashboard API to implement this functionality. */

// Register widget:
Dashboard.registerWidget(function (dashboardAPI, registerWidgetAPI) {
    // Load GitHub profile data
    loadAndRenderUser(USER_NAME)
        // Set the widget title
        .then(user => dashboardAPI.setTitle(`GitHub User ${user.login}`));

    // Add the refresh button.
    registerWidgetAPI({
        onRefresh: () => loadAndRenderUser(USER_NAME)
    });
});
