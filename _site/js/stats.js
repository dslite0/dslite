// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)

let domain = "strife.nekoweb.org"; // <<<--- Insert your domain here!

(async () => {
  try {
    const request = await fetch(`https://nekoweb.org/api/site/info/${domain}`,);
    const json = await request.json();

    const updated = new Date(json.updated_at).toLocaleDateString(); // Formats Last Updated text
    const created = new Date(json.created_at).toLocaleDateString(); // Formats Creation Date text

    if (document.getElementById("created")) document.getElementById("created").innerHTML = `<em>Created</em>: ${created}`;
    if (document.getElementById("updated")) document.getElementById("updated").innerHTML = `<em>Updated</em>: ${updated}`;
    if (document.getElementById("visitors")) document.getElementById("visitors").innerHTML = `<em>Visits</em>: ${json.views}`;
    if (document.getElementById("followers")) document.getElementById("followers").innerHTML = `<em>Followers</em>: ${json.followers}`;
  } catch (error) {
    console.error(error);
    // If you wish to insert some fallback here, you may do so!
  }
})();