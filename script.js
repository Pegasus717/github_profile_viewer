const profile_img = document.getElementById("avatar");
      const pname = document.getElementById("name");
      const bio = document.getElementById("bio");
      const d1 = document.getElementById("d1");
      const d2 = document.getElementById("d2");
      const d3 = document.getElementById("d3");
      const d4 = document.getElementById("d4");
      const d5 = document.getElementById("prolink");
      const searchbtn = document.getElementById("searchbtn");

      async function getprofile(uid) {
        try {
          const res = await fetch(`https://api.github.com/users/${uid}`);
          const data = await res.json();

          if (data.message === "Not Found") {
            alert(" User not found!");
            return;
          }

          profile_img.classList.add("fade-out");
          pname.classList.add("fade-out");
          bio.classList.add("fade-out");
          d1.classList.add("fade-out");
          d2.classList.add("fade-out");
          d3.classList.add("fade-out");
          d4.classList.add("fade-out");

          setTimeout(() => {
            profile_img.setAttribute("src", data.avatar_url);
            pname.textContent = data.name || "No Name Available";
            bio.textContent = data.bio || "No bio available";
            d1.textContent = `Repos: ${data.public_repos}`;
            d2.textContent = `Followers: ${data.followers}`;
            d3.textContent = `Following: ${data.following}`;
            d4.textContent = data.email
              ? `Email: ${data.email}`
              : `Email: Not Available`;
            d5.setAttribute("href", data.html_url);

            [profile_img, pname, bio, d1, d2, d3, d4].forEach((el) => {
              el.classList.remove("fade-out");
              el.classList.add("fade-in");
            });

            setTimeout(() => {
              [profile_img, pname, bio, d1, d2, d3, d4].forEach((el) =>
                el.classList.remove("fade-in")
              );
            }, 600);
          }, 400);
        } catch (error) {
          console.error("Error fetching profile:", error);
          alert("Failed to fetch data. Please try again.");
        }
      }

      searchbtn.addEventListener("click", () => {
        const searchval = document.getElementById("search").value.trim();
        if (searchval === "") {
          alert("Please enter a username!");
          return;
        }
        getprofile(searchval);
      });
