// ============================================================
// PROJECT MODAL DATA
// Fill in each project's details below
// ============================================================

const projectData = {
  "gunman-drift": {
    title: "Gunman Drift",
    tags: ["C#", "Unity", "SteamWorks", "Unity UGS"],
    technical: `
      <p>The biggest technical challenge was implementing a secure live-service backend that couldn't be manipulated client-side. Unity UGS handled player data — XP, currency, leaderboards — but the tricky part was validating transactions server-side so players couldn't spoof values.</p>
      <p>The leaderboard system required async callback chains to pull Steam usernames and match them to UGS player IDs, handling race conditions where the Steam callback and UGS response arrived in unpredictable order.</p>
      <p>Cross-platform testing across PC, VR and Android threw up unexpected input system conflicts — Unity's new Input System behaved differently on Oculus versus standalone Android, requiring platform-specific input maps.</p>
    `,
    screenshots: [
      { src: "./images/Gmd.png", caption: "Main gameplay — driving and shooting" }
    ],
    code: `// Async leaderboard fetch with Steam username resolution
private async Task LoadLeaderboard() {
    var scores = await LeaderboardsService.Instance
        .GetScoresAsync(leaderboardId, new GetScoresOptions { Limit = 10 });

    foreach (var entry in scores.Results) {
        string username = await SteamUsernameResolver
            .GetUsernameAsync(entry.PlayerId);
        leaderboardUI.AddEntry(username, entry.Score);
    }
}`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Set up server-side Cloud Code validation earlier rather than retrofitting it. Adding security as an afterthought meant refactoring systems already built around client-side trust.</p>
      <p><strong>What I'm proud of:</strong> Shipping a live-service game solo with a functioning economy and leaderboard. The SteamWorks item trading integration especially — figuring out the SDK with minimal documentation was a real grind but worth it.</p>
    `
  },

  "frankenstein-mod": {
    title: "Co-OPERATION: MultiTurn — Frankenstein Mod",
    tags: ["Lua", "Leadership", "Agile"],
    technical: `
      <p>Modding an existing game in Lua meant working within constraints I didn't control — the game's exposed API determined what was and wasn't possible. Understanding what hooks were available required reading the base game's code and reverse-engineering undocumented behaviour.</p>
      <p>Win condition logic was the trickiest part — it had to integrate with the base game's turn and state system without breaking existing game modes.</p>
    `,
    screenshots: [
      { src: "./images/LuaMod.png", caption: "Frankenstein Mod gameplay" }
    ],
    code: `-- Win condition check integrated with base game state
function onTurnEnd(gameState)
    local frankensteinParts = countFrankensteinParts(gameState.board)
    
    if frankensteinParts >= REQUIRED_PARTS then
        triggerWinAnimation(gameState.currentPlayer)
        return GameResult.WIN
    end
    
    if gameState.turnsRemaining <= 0 then
        return GameResult.DRAW
    end
    
    return GameResult.CONTINUE
end`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Define scope more strictly at the start. Mid-project feature additions caused scope creep and deadline pressure. A clearer initial design document would have kept the team focused.</p>
      <p><strong>What I'm proud of:</strong> Getting the mod approved and published by the original developer. That external validation meant a lot — someone else's professional judgement that our work was good enough to associate with their game.</p>
    `
  },

  "hex-bound": {
    title: "HEX BOUND",
    tags: ["C#", "Unity", "3D", "Game Jam"],
    technical: `
      <p>The core challenge was making a game controllable with a single input — the spacebar. The solution was a timer-driven action wheel cycling through available actions automatically. Getting the timing to feel fair rather than frustrating took most of the jam.</p>
      <p>The grid-based dungeon logic required a clean separation between world state and visual representation — updating one without the other caused desyncs I had to debug under time pressure.</p>
    `,
    screenshots: [
      { src: "./images/HexBound.png", caption: "HEX BOUND gameplay" }
    ],
    code: `// Timer-driven action selection cycling
private IEnumerator CycleActions() {
    while (isPlayerTurn) {
        for (int i = 0; i < availableActions.Count; i++) {
            currentActionIndex = i;
            UpdateActionHighlight(i);
            yield return new WaitForSeconds(cycleSpeed);
        }
    }
}

private void OnSpacePressed() {
    ExecuteAction(availableActions[currentActionIndex]);
    StopCoroutine(actionCycleCoroutine);
    EndPlayerTurn();
}`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Spend more time on visual feedback for the action timer. Players struggled to read the cycle speed under pressure — a more prominent UI element would have improved accessibility.</p>
      <p><strong>What I'm proud of:</strong> Placing 1st out of 9 with a genuinely novel control scheme in 7 days. The one-input constraint forced creative design decisions I wouldn't have made otherwise.</p>
    `
  },

  "devil-plinko": {
    title: "DEVIL PLINKO",
    tags: ["C#", "Unity", "2D", "Game Jam"],
    technical: `
      <p>Three hours is an extreme constraint. The approach was to use Unity's built-in 2D physics as much as possible and only write logic physics couldn't handle — the upgrade system and scoring.</p>
      <p>The scaling algorithm for peg density was the most interesting bit — as the player upgrades, pegs needed to redistribute without creating unplayable gaps or clusters.</p>
    `,
    screenshots: [
      { src: "./images/Devil Plinko.png", caption: "Devil Plinko gameplay" }
    ],
    code: `// Dynamic peg grid scaling on upgrade
private void RegeneratePegs(int density) {
    ClearExistingPegs();
    float spacing = baseSpacing / (1 + (density * 0.2f));
    
    for (int x = 0; x < columns; x++) {
        for (int y = 0; y < rows; y++) {
            Vector2 pos = new Vector2(
                x * spacing + (y % 2 == 0 ? spacing / 2 : 0),
                y * spacing
            );
            Instantiate(pegPrefab, pos, Quaternion.identity);
        }
    }
}`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Sound design — I had no time for audio and it's the first thing players notice is missing. Even simple sound effects would have lifted the feel significantly.</p>
      <p><strong>What I'm proud of:</strong> Placing 3rd out of 25 while streaming the entire development live. Having to explain decisions out loud as I made them actually helped me think more clearly under pressure.</p>
    `
  },

  "restaurant-booking": {
    title: "Restaurant Booking App",
    tags: ["Java", "Android", "REST API"],
    technical: `
      <p>The main challenge was handling async REST API calls on Android without blocking the UI thread. Android enforces strict thread policies — any network call on the main thread throws a NetworkOnMainThreadException — so all API communication had to run on background threads with results posted back to the UI thread.</p>
      <p>Form validation also needed to handle edge cases gracefully — partial dates, invalid phone formats, and empty required fields all needed distinct error states rather than a generic failure message.</p>
    `,
    screenshots: [
      { src: "./images/androidjava.png", caption: "Restaurant booking app UI" }
    ],
    code: `// Async API call with UI thread callback
private void submitBooking(Booking booking) {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    Handler handler = new Handler(Looper.getMainLooper());

    executor.execute(() -> {
        try {
            Response<BookingConfirmation> response =
                apiService.createBooking(booking).execute();

            handler.post(() -> {
                if (response.isSuccessful()) {
                    showConfirmation(response.body());
                } else {
                    showError("Booking failed: " + response.code());
                }
            });
        } catch (IOException e) {
            handler.post(() -> showError("Network error"));
        }
    });
}`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Use Retrofit and LiveData from the start rather than raw HttpURLConnection and ExecutorService. The boilerplate for manual async handling is significant and error-prone.</p>
      <p><strong>What I'm proud of:</strong> This was my first full Android app with a real backend. Getting the complete data flow working — UI input, validation, API call, response parsing, UI update — gave me a solid understanding of client-server architecture.</p>
    `
  },

  "drive": {
    title: "DRIVE: THE TEN FUEL CANS",
    tags: ["C++", "OpenGL", "GLSL"],
    technical: `
      <p>Building a 3D renderer from scratch means implementing everything engines take for granted — the transformation pipeline, lighting model, camera system, and collision detection all had to be written manually.</p>
      <p>The GLSL shader work was the steepest learning curve. Understanding how vertex and fragment shaders communicate via varyings, and how the lighting equation maps to GPU parallel execution, required rebuilding mental models formed using Unity's abstracted rendering.</p>
      <p>Matrix math for camera transformations — view, projection, model matrices — had to be implemented and debugged without visual tools, which meant reasoning from first principles throughout.</p>
    `,
    screenshots: [
      { src: "./images/project-3.png", caption: "Custom OpenGL renderer" }
    ],
    code: `// GLSL fragment shader — Phong lighting model
#version 460 core
in vec3 FragPos;
in vec3 Normal;

uniform vec3 lightPos;
uniform vec3 viewPos;
uniform vec3 lightColor;

void main() {
    // Ambient
    vec3 ambient = 0.1 * lightColor;

    // Diffuse
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // Specular
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    vec3 specular = 0.5 * spec * lightColor;

    FragColor = vec4((ambient + diffuse + specular), 1.0);
}`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Structure the renderer around a proper abstraction layer earlier. Tightly coupled systems made adding features painful — a basic entity-component pattern would have helped enormously.</p>
      <p><strong>What I'm proud of:</strong> This project taught me what engines actually do. Every time I use Unity now I have a much clearer picture of what's happening under the hood, which makes me a better developer across everything.</p>
    `
  },

  "greatest-blacksmith": {
    title: "Greatest Blacksmith",
    tags: ["C#", "Unity", "Blender", "Android"],
    technical: `
      <p>The main technical challenge was mobile optimisation — Android devices vary wildly in capability and the game had to run acceptably across a range of hardware. Draw calls, texture compression, and physics complexity all had to be carefully budgeted.</p>
      <p>The full 3D asset pipeline from Blender to Unity required establishing consistent export settings, UV unwrapping conventions, and material naming so assets dropped in cleanly without manual fixing each time.</p>
    `,
    screenshots: [
      { src: "./images/Greatest Blacksmith.png", caption: "Greatest Blacksmith gameplay" }
    ],
    code: `// Mobile-optimised UI scaling for different screen sizes
private void ScaleUIForDevice() {
    float referenceWidth = 1080f;
    float scaleFactor = Screen.width / referenceWidth;
    
    canvasScaler.scaleFactor = Mathf.Clamp(scaleFactor, 0.5f, 2.0f);
    
    // Adjust touch target sizes for smaller screens
    if (scaleFactor < 0.75f) {
        foreach (var button in touchTargets) {
            button.GetComponent<RectTransform>().sizeDelta *= 1.3f;
        }
    }
}`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Establish the asset pipeline and naming conventions as a team at the start. Mid-project inconsistencies in how team members named and exported assets caused unnecessary integration friction.</p>
      <p><strong>What I'm proud of:</strong> Shipping a polished 3D mobile game as a team. Coordinating art, code, and design across multiple people with a shared codebase taught me more about collaborative development than any solo project.</p>
    `
  },

  "ranger-nes": {
    title: "Ranger NES",
    tags: ["GDScript", "Godot", "2D"],
    technical: `
      <p>Working in Godot after primarily using Unity required adapting to a different scene and node architecture. Godot's signal system for event-driven communication was different enough from Unity's event system to require deliberate re-learning.</p>
      <p>The save system needed to persist scores and progress across sessions reliably — handling file I/O in GDScript and ensuring save data was backwards-compatible if the game was updated.</p>
    `,
    screenshots: [
      { src: "./images/Ranger.png", caption: "Ranger NES gameplay" }
    ],
    code: `# Save system with JSON persistence
func save_game():
    var save_data = {
        "top_scores": top_scores,
        "best_time": best_time,
        "levels_completed": levels_completed
    }
    var file = FileAccess.open("user://save.json", FileAccess.WRITE)
    file.store_string(JSON.stringify(save_data))
    file.close()

func load_game():
    if not FileAccess.file_exists("user://save.json"):
        return
    var file = FileAccess.open("user://save.json", FileAccess.READ)
    var data = JSON.parse_string(file.get_as_text())
    top_scores = data.get("top_scores", [])
    best_time = data.get("best_time", 0)`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Get more familiar with Godot's node architecture before the jam started. Learning the engine and building the game simultaneously under a deadline added unnecessary pressure.</p>
      <p><strong>What I'm proud of:</strong> The UI systems I built — save, timer, scores, scene switching, pausing — all worked cleanly together. Good systems architecture in a jam environment is harder than it sounds.</p>
    `
  },

  "all-for-one": {
    title: "All For One",
    tags: ["C#", "Unity", "2D"],
    technical: `
      <p>The Brackeys Game Jam ran on a tight deadline with a specific theme revealed at the start. The challenge was rapidly scoping a game that fit the theme, was achievable in the time, and still felt polished enough to compete.</p>
      <p>Working with a shared codebase under time pressure meant establishing clear ownership of systems early — who owned the player controller, who owned the UI, who owned the enemy system — to avoid merge conflicts.</p>
    `,
    screenshots: [
      { src: "./images/AFO.png", caption: "All For One gameplay" }
    ],
    code: `// Modular weapon system for rapid iteration
public class WeaponSystem : MonoBehaviour {
    [SerializeField] private WeaponData currentWeapon;
    private float lastFireTime;

    public void TryFire() {
        if (Time.time - lastFireTime < currentWeapon.fireRate) return;
        
        var projectile = Instantiate(
            currentWeapon.projectilePrefab,
            firePoint.position,
            firePoint.rotation
        );
        projectile.GetComponent<Projectile>()
            .Initialize(currentWeapon.damage, currentWeapon.speed);
        lastFireTime = Time.time;
    }
}`,
    lessons: `
      <p><strong>What I'd do differently:</strong> Spend the first hour of a jam just on design and scoping as a team rather than jumping straight into code. Time spent aligning on the design upfront saves much more time later.</p>
      <p><strong>What I'm proud of:</strong> The full asset pipeline from Illustrator to Unity — creating and importing clean 2D vector assets under jam constraints without the usual texture and import issues took real discipline.</p>
    `
  }
};

// ============================================================
// MODAL ENGINE
// ============================================================

function openModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  const modal = document.getElementById('project-modal');

  // Reset to first tab
  modal.querySelectorAll('.modal-tab').forEach((t, i) => t.classList.toggle('active', i === 0));
  modal.querySelectorAll('.modal-panel').forEach((p, i) => p.classList.toggle('active', i === 0));

  // Fill content
  modal.querySelector('.modal-title').textContent = data.title;

  const tagsEl = modal.querySelector('.modal-tags');
  tagsEl.innerHTML = data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');

  modal.querySelector('#tab-technical').innerHTML = data.technical;

  modal.querySelector('#tab-screenshots').innerHTML = data.screenshots.map(s => `
    <figure class="modal-figure">
      <img src="${s.src}" alt="${s.caption}" />
      <figcaption>${s.caption}</figcaption>
    </figure>
  `).join('');

  modal.querySelector('#tab-code').innerHTML = `<pre><code>${escapeHtml(data.code.trim())}</code></pre>`;
  modal.querySelector('#tab-lessons').innerHTML = data.lessons;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('project-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Tab switching
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });
});

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
