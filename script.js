/* ============================================================
   PORTFOLIO – script.js
   Vanilla JS: navigation, mobile menu, motion toggle, scroll
   reveals and scroll-linked transitions, screenshot viewer,
   career timeline + optional side-scrolling career game
   ============================================================ */

;(function () {
  "use strict"

  // ---------------------- Helpers ----------------------

  /** Query a single element */
  const qs = (selector, root = document) => root.querySelector(selector)
  /** Query all elements */
  const qsa = (selector, root = document) => root.querySelectorAll(selector)

  // ---------------------- Dynamic year ----------------------
  const yearEl = qs("#year")
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  // ---------------------- Nav: scrolled state ----------------------
  const navHeader = qs("#nav-header")

  function updateNavScrolled() {
    if (!navHeader) return
    if (window.scrollY > 20) {
      navHeader.classList.add("scrolled")
    } else {
      navHeader.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", updateNavScrolled, { passive: true })
  updateNavScrolled() // run once on load

  // ---------------------- Nav: mobile menu toggle ----------------------
  const navToggle = qs("#nav-toggle")
  const navLinks = qs("#nav-links")

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open")
      navToggle.classList.toggle("open", isOpen)
      navToggle.setAttribute("aria-expanded", String(isOpen))
    })

    // Escape closes the mobile menu and returns focus to its toggle.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open")
        navToggle.classList.remove("open")
        navToggle.setAttribute("aria-expanded", "false")
        navToggle.focus()
      }
    })

    // Close menu when a nav link is clicked
    qsa(".nav-link", navLinks).forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open")
        navToggle.classList.remove("open")
        navToggle.setAttribute("aria-expanded", "false")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navHeader.contains(e.target)) {
        navLinks.classList.remove("open")
        navToggle.classList.remove("open")
        navToggle.setAttribute("aria-expanded", "false")
      }
    })
  }

  // ---------------------- Active nav link on scroll ----------------------
  /**
   * Highlights the nav link that corresponds to the currently visible section.
   */
  const sections = qsa("section[id]")
  const navLinkEls = qsa(".nav-link")
  // Where an element sits in the page, whatever transform it is being drawn with: on wide
  // screens the desk camera projects the section being read onto the monitor.
  const pageTop = (el) => {
    let y = 0
    for (let node = el; node; node = node.offsetParent) y += node.offsetTop
    return y
  }

  function setActiveLink() {
    let currentId = ""

    sections.forEach((section) => {
      const top = pageTop(section) - window.scrollY
      // Consider section "active" if its top is within the upper portion of viewport
      if (top <= window.innerHeight * 0.35) {
        currentId = section.id
      }
    })

    navLinkEls.forEach((link) => {
      link.classList.remove("active")
      link.removeAttribute("aria-current")
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active")
        link.setAttribute("aria-current", "location")
      }
    })
  }

  window.addEventListener("scroll", setActiveLink, { passive: true })
  setActiveLink()

  // ============================================================
  //  CAREER HISTORY
  //  Single source of truth for both the readable timeline and
  //  the optional side-scrolling game. Newest role first.
  // ============================================================
  const experiences = [
    {
      buildingLabel: "NGCP",
      role: "Lead Specialist, Resource Optimization & Market Interface",
      company: "National Grid Corporation of the Philippines",
      dates: "Jul 2024 - Present",
      points: [
        "Lead internal application delivery for the operator of the Philippines' national electricity transmission grid, owning the full SDLC from requirements through architecture, release, and production support.",
        "Architected and built a modular Django enterprise platform that consolidates manual operational processes into configurable workflow modules, with background processing and live PostgreSQL and Oracle integrations on Windows Server infrastructure.",
        "Develop AI-supported document processing within the platform to extract and route information from recurring compliance and reporting documents.",
        "Run a self-hosted n8n instance on-prem for business automation, including a scheduled workflow that checks each day whether Power Outlook data is current and emails key personnel when it is stale or confirms when it has updated.",
        "Lead ISO-aligned process improvement across business workflows, compliance activities, and operational reporting.",
        "Modernize legacy internal tools onto current Python/Django, Node.js, and SvelteKit stacks, and raise SDLC, QA, and DevOps standards for the team.",
      ],
      stack: [
        "n8n",
        "Python",
        "Django",
        "PostgreSQL",
        "Oracle DB",
        "REST APIs",
        "Node.js",
        "SvelteKit",
        "Windows Server",
        "Business Process Analysis",
      ],
    },
    {
      buildingLabel: "Realtair",
      role: "Senior Software Engineer",
      company: "Realtair, Inc. (Remote)",
      dates: "Oct 2023 - Apr 2024",
      points: [
        "Developed and maintained the Deposits application across C#/.NET MVC, React, TypeScript, and MSSQL services, taking business-critical issues from triage through to production fix.",
        "Reviewed and improved AWS SNS/SQS messaging, EC2/RDS infrastructure, and CI/CD for application stability and performance.",
      ],
      stack: ["C#", ".NET MVC", "React", "TypeScript", "AWS", "MSSQL", "CI/CD"],
    },
    {
      buildingLabel: "GoTeam",
      role: "Senior Full-Stack Developer",
      company: "GoTeam / Comtrac (Remote)",
      dates: "Feb 2023 - Sep 2023",
      points: [
        "Built new modules and resolved defects across the full stack of an Investigation Management platform, with a Vue.js 3 front end against C#/.NET services on Azure.",
        "Extended the CQRS-based application architecture, and acted as the team's go-to developer for the front end.",
      ],
      stack: ["Vue.js 3", "C# / .NET", "CQRS", "Azure", "CI/CD", "Git"],
    },
    {
      buildingLabel: "Theoria",
      role: "Senior Full-Stack Developer",
      company: "Theoria Medical (Remote, USA)",
      dates: "Sep 2022 - Feb 2023",
      points: [
        "Built the internal content management system end to end for clinical and operations staff, with a React/TypeScript front end against GraphQL services on MongoDB.",
        "Delivered supporting operational scripts alongside the CMS. Both remained in use after the engagement ended.",
        "Mentored a junior developer through informal code review and day-to-day guidance.",
      ],
      stack: ["React", "TypeScript", "MongoDB", "GraphQL", "Tailwind CSS"],
    },
    {
      buildingLabel: "NGCP",
      role: "Lead/Senior Specialist, Software Development",
      company: "National Grid Corporation of the Philippines",
      dates: "Jan 2016 - Sep 2022",
      points: [
        "Led enterprise application development and legacy modernization, including the Single Sign-On/Active Directory, Market Data Interchange, and Project Sentinel initiatives.",
        "Delivered the 5-Minute Real-Time Dashboard and operational applications involving SCADA data integrations.",
        "Owned the full SDLC for micro-apps, background job automation, and internal platforms.",
      ],
      stack: ["Laravel", "Vue.js", "Node.js", "Oracle DB", "MongoDB", "SCADA", "Bootstrap"],
    },
    {
      buildingLabel: "Earlier",
      role: "Earlier experience",
      company: "Teradata, Commission on Audit, NGCP",
      dates: "2013 - 2015",
      points: [
        "Teradata: customized marketing operations applications for enterprise clients.",
        "Commission on Audit: developed internal systems including the COA Data Warehouse and Asset Monitoring tools.",
        "NGCP: developed and deployed the Central Receiving and Monitoring Center App.",
      ],
      stack: ["C#", ".NET MVC", "MSSQL", "AngularJS", "JavaScript", "jQuery", "Bootstrap"],
    },
  ]

  // ---------------------- Experience: readable timeline ----------------------
  /**
   * The primary, always-available view of the career history. Rendered from the
   * same data the game uses so the two can never drift apart.
   */
  function renderTimeline() {
    const timelineEl = qs("#experience-timeline")
    if (!timelineEl) return

    const fragment = document.createDocumentFragment()

    experiences.forEach((job) => {
      const item = document.createElement("li")
      item.className = "timeline-item"

      const dates = document.createElement("p")
      dates.className = "timeline-dates"
      dates.textContent = job.dates

      const role = document.createElement("h3")
      role.className = "timeline-role"
      role.textContent = job.role

      const company = document.createElement("p")
      company.className = "timeline-company"
      company.textContent = job.company

      const points = document.createElement("ul")
      points.className = "timeline-points"
      job.points.forEach((point) => {
        const li = document.createElement("li")
        li.textContent = point
        points.appendChild(li)
      })

      const stack = document.createElement("div")
      stack.className = "timeline-stack"
      job.stack.forEach((skill) => {
        const chip = document.createElement("span")
        chip.className = "experience-chip"
        chip.textContent = skill
        stack.appendChild(chip)
      })

      item.append(dates, role, company, points, stack)
      fragment.appendChild(item)
    })

    timelineEl.innerHTML = ""
    timelineEl.appendChild(fragment)
  }

  renderTimeline()

  /**
   * Keeps the timeline skimmable: each role shows its first two points, and the
   * rest open on request. Without scripting every point shows.
   */
  const visiblePoints = 2

  function enhanceTimeline() {
    qsa("#experience-timeline .timeline-item").forEach((item, index) => {
      const points = qs(".timeline-points", item)
      const stack = qs(".timeline-stack", item)
      if (!points) return

      // Lead with what was done, then the tools.
      if (stack) points.after(stack)

      const extra = Array.from(points.children).slice(visiblePoints)
      if (!extra.length) return

      const extraList = document.createElement("ul")
      extraList.className = "timeline-points"
      extraList.append(...extra)

      const more = document.createElement("div")
      more.className = "timeline-more"
      more.id = `timeline-more-${index}`
      more.inert = true
      more.appendChild(extraList)
      points.after(more)

      const label = `${extra.length} more`
      const toggle = document.createElement("button")
      toggle.type = "button"
      toggle.className = "timeline-toggle"
      toggle.setAttribute("aria-expanded", "false")
      toggle.setAttribute("aria-controls", more.id)
      toggle.innerHTML = `<span aria-hidden="true">+</span> <b>${label}</b>`
      toggle.addEventListener("click", () => {
        const open = !item.classList.contains("open")
        item.classList.toggle("open", open)
        toggle.setAttribute("aria-expanded", String(open))
        qs("b", toggle).textContent = open ? "Show less" : label
        more.inert = !open
      })

      more.after(toggle)
    })
  }

  enhanceTimeline()

  // ---------------------- Experience: optional career game ----------------------
  /**
   * Builds and runs the side-scrolling career scene. Called lazily the first time
   * the player opens it — the scene needs a measurable width, which it doesn't
   * have while the container is still hidden.
   */
  function initCareerGame() {
    const sceneEl = qs("#experience-scene")
    const worldEl = qs("#experience-world")
    const personEl = qs("#experience-person")
    const detailsEl = qs("#experience-details")
    const pointsEl = qs("#experience-points")
    const stackEl = qs("#experience-stack")
    const roleEl = qs(".experience-role", detailsEl || document)
    const companyEl = qs(".experience-company", detailsEl || document)
    const datesEl = qs(".experience-dates", detailsEl || document)
    const moveLeftBtn = qs("#move-left")
    const moveRightBtn = qs("#move-right")
    const moveJumpBtn = qs("#move-jump")
    const skylineEl = qs(".experience-skyline")
    const hudEl = qs("#experience-hud")
    const hudProgressEl = qs("#hud-progress")
    const hudCoinsEl = qs("#hud-coins")

    if (!(sceneEl && worldEl && personEl && detailsEl && pointsEl && stackEl && roleEl && companyEl && datesEl)) {
      return
    }

    const layout = {
      startX: 170,
      spacing: 210,
      width: 126,
      baseHeight: 148,
    }

    const heights = [204, 178, 190, 170, 222, 158]
    const keyState = { left: false, right: false }
    const touchState = { left: false, right: false }
    const world = {
      sceneWidth: 0,
      width: 0,
      personX: 92,
      personY: 0,
      velocityY: 0,
      facing: 1,
      autoTarget: null,
      cameraX: 0,
      speed: 240,
      gravity: 1500,
      jumpImpulse: 560,
      lastTime: 0,
      activeIndex: -1,
      buildingNodes: [],
      items: [],
      visited: new Set(),
      completed: false,
      tasks: 0,
      taskBlocks: [],
      gate: null,
    }

    let rafId = null

    function renderExperienceWorld() {
      const fragment = document.createDocumentFragment()

      world.items = experiences.map((job, index) => {
        const building = document.createElement("article")
        const variant = index % 2 === 0 ? "variant-a" : "variant-b"
        building.className = `experience-building ${variant}`

        const label = document.createElement("div")
        label.className = "building-label"

        const sign = document.createElement("div")
        sign.className = "building-sign"
        sign.textContent = job.buildingLabel

        const years = document.createElement("div")
        years.className = "building-years"
        years.textContent = job.dates

        const x = layout.startX + index * layout.spacing
        const height = heights[index % heights.length]
        building.style.left = `${x}px`
        building.style.width = `${layout.width}px`
        building.style.height = `${height}px`

        // Status lamp: idle until the station has been visited.
        const lamp = document.createElement("span")
        lamp.className = "building-lamp"

        label.append(sign, years)
        building.append(label, lamp)
        building.title = `Walk to ${job.buildingLabel}`
        building.addEventListener("click", () => {
          walkTo(x + layout.width / 2 - 20)
        })
        fragment.appendChild(building)

        return {
          ...job,
          x,
          width: layout.width,
          height,
          center: x + layout.width / 2,
          node: building,
        }
      })

      // Decorative stacks of work packets waiting on the line between stations
      const crates = [
        { gapAfter: 2, height: 56 },
        { gapAfter: 4, height: 28 },
      ]
      crates.forEach((crate) => {
        const node = document.createElement("div")
        node.className = "experience-crate"
        node.style.left = `${layout.startX + crate.gapAfter * layout.spacing + layout.width + 22}px`
        node.style.height = `${crate.height}px`
        fragment.appendChild(node)
      })

      // Task blocks to jump into (world x of each block's center)
      world.taskBlocks = [112, 548, 968].map((center) => {
        const node = document.createElement("div")
        node.className = "experience-taskblock"
        node.textContent = "⚙"
        node.style.left = `${center - 17}px`
        fragment.appendChild(node)
        return { center, node, used: false }
      })

      // Release gate past the last station marks the end of the line
      const gate = document.createElement("div")
      gate.className = "experience-gate"
      gate.innerHTML = '<span class="gate-lamp"></span><span class="gate-banner">SHIP</span>'
      gate.style.left = `${layout.startX + (experiences.length - 1) * layout.spacing + layout.width + 40}px`
      fragment.appendChild(gate)
      world.gate = gate

      worldEl.innerHTML = ""
      worldEl.appendChild(fragment)
      world.buildingNodes = world.items.map((item) => item.node)
    }

    function setDetails(job) {
      if (!job) {
        roleEl.textContent = "Walk to a station"
        companyEl.textContent = "Move close to any station to inspect the role, dates, responsibilities, and stack."
        datesEl.textContent = "Latest roles are placed on the left."
        fillList(pointsEl, "li", [
          "Tip: hold the movement buttons on mobile for continuous walking.",
          "Keyboard: ← / → or A / D to walk, W or Space to jump.",
          "Tap any station to walk straight to it and log the role.",
        ])
        stackEl.textContent = ""
        return
      }

      roleEl.textContent = job.role
      companyEl.textContent = job.company
      datesEl.textContent = job.dates
      fillList(pointsEl, "li", job.points)
      fillList(stackEl, "span", job.stack, "experience-chip")
    }

    function fillList(parent, tag, texts, className) {
      parent.replaceChildren(
        ...texts.map((text) => {
          const node = document.createElement(tag)
          if (className) node.className = className
          node.textContent = text
          return node
        }),
      )
    }

    function updateActiveBuilding() {
      const threshold = 92
      let closestIndex = -1
      let closestDistance = Number.POSITIVE_INFINITY

      world.items.forEach((item, index) => {
        const distance = Math.abs(world.personX + 20 - item.center)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      if (closestDistance <= threshold) {
        if (world.activeIndex !== closestIndex) {
          world.activeIndex = closestIndex
          setDetails(world.items[closestIndex])
          markVisited(closestIndex)
        }
      } else if (world.activeIndex !== -1) {
        world.activeIndex = -1
        setDetails(null)
      }

      world.buildingNodes.forEach((node, index) => {
        node.classList.toggle("active", index === world.activeIndex)
      })
    }

    function walkTo(targetX) {
      world.autoTarget = Math.max(40, Math.min(world.width - 54, targetX))
      sceneEl.focus({ preventScroll: true })
    }

    function markVisited(index) {
      if (world.visited.has(index)) return
      world.visited.add(index)

      const badge = document.createElement("span")
      badge.className = "building-flag"
      badge.textContent = "✓"
      world.items[index].node.classList.add("visited")
      world.items[index].node.appendChild(badge)

      updateHud()
      if (world.visited.size === world.items.length) celebrate()
    }

    function updateHud() {
      if (hudProgressEl) hudProgressEl.textContent = `ROLES ${world.visited.size}/${world.items.length}`
      if (hudCoinsEl) hudCoinsEl.textContent = `TASKS ${world.tasks}`
    }

    function celebrate() {
      if (world.completed) return
      world.completed = true
      if (hudEl) hudEl.classList.add("complete")
      if (world.gate) world.gate.classList.add("open")

      const toast = document.createElement("div")
      toast.className = "experience-toast"
      toast.textContent = "✓ All roles logged. Shipped!"
      sceneEl.appendChild(toast)
      window.setTimeout(() => toast.remove(), 4200)
    }

    function jump() {
      if (world.personY > 0 || world.velocityY > 0) return
      world.velocityY = world.jumpImpulse
      // Check for a task block bump near the apex of the jump (t = impulse / gravity).
      window.setTimeout(bumpNearbyBlock, 340)
    }

    function bumpNearbyBlock() {
      if (rafId === null || world.personY <= 0) return
      const headX = world.personX + 20
      const block = world.taskBlocks.find((item) => Math.abs(item.center - headX) <= 28)
      if (!block) return

      block.node.classList.remove("bumped")
      void block.node.offsetWidth // restart the bump animation
      block.node.classList.add("bumped")

      if (block.used) return
      block.used = true
      block.node.classList.add("used")
      block.node.textContent = "✓"

      const token = document.createElement("span")
      token.className = "experience-token"
      token.textContent = "+1"
      token.style.left = `${block.center - 14}px`
      worldEl.appendChild(token)
      window.setTimeout(() => token.remove(), 700)

      world.tasks += 1
      updateHud()
    }

    function updateSceneMetrics() {
      // Nothing sensible to measure while the container is collapsed.
      if (!sceneEl.clientWidth) return

      world.sceneWidth = sceneEl.clientWidth
      world.width = Math.max(world.sceneWidth + 220, layout.startX + (experiences.length - 1) * layout.spacing + 260)
      worldEl.style.width = `${world.width}px`
      world.personX = Math.min(world.personX, world.width - 60)
      if (skylineEl) {
        // Skyline scrolls slower than the world (parallax), so it needs extra width to stay covered.
        const maxCamera = Math.max(0, world.width - world.sceneWidth)
        skylineEl.style.width = `${world.sceneWidth + maxCamera * 0.22 + 40}px`
      }
      updateTransforms()
      updateActiveBuilding()
    }

    function updateTransforms() {
      const maxCamera = Math.max(0, world.width - world.sceneWidth)
      const targetCamera = world.personX - world.sceneWidth / 2 + 20
      world.cameraX = Math.max(0, Math.min(maxCamera, targetCamera))
      worldEl.style.transform = `translateX(${-world.cameraX}px)`
      personEl.style.left = `${world.personX - world.cameraX}px`
      personEl.style.transform = `translateY(${-world.personY}px) scaleX(${world.facing})`
      if (skylineEl) skylineEl.style.transform = `translateX(${-world.cameraX * 0.22}px)`
    }

    function getDirection() {
      const left = keyState.left || touchState.left
      const right = keyState.right || touchState.right
      if (left !== right) {
        world.autoTarget = null
        return left ? -1 : 1
      }
      if (world.autoTarget !== null) {
        const dx = world.autoTarget - world.personX
        if (Math.abs(dx) <= 6) {
          world.autoTarget = null
          return 0
        }
        return dx < 0 ? -1 : 1
      }
      return 0
    }

    function tick(timestamp) {
      if (!world.lastTime) {
        world.lastTime = timestamp
      }

      const delta = Math.min(32, timestamp - world.lastTime) / 1000
      world.lastTime = timestamp

      const direction = getDirection()
      if (direction !== 0) {
        world.personX += direction * world.speed * delta
        world.personX = Math.max(40, Math.min(world.width - 54, world.personX))
        world.facing = direction < 0 ? -1 : 1
      }

      const airborne = world.personY > 0 || world.velocityY > 0
      if (airborne) {
        world.velocityY -= world.gravity * delta
        world.personY += world.velocityY * delta
        if (world.personY <= 0) {
          world.personY = 0
          world.velocityY = 0
        }
      }

      personEl.classList.toggle("walking", direction !== 0 && world.personY <= 0)
      personEl.classList.toggle("airborne", world.personY > 0)

      updateTransforms()
      updateActiveBuilding()
      rafId = window.requestAnimationFrame(tick)
    }

    function startLoop() {
      if (rafId !== null) return
      world.lastTime = 0
      rafId = window.requestAnimationFrame(tick)
    }

    function stopLoop() {
      if (rafId === null) return
      window.cancelAnimationFrame(rafId)
      rafId = null
      keyState.left = false
      keyState.right = false
      touchState.left = false
      touchState.right = false
    }

    function handleKeyChange(event, isPressed) {
      // Only capture keys while the game loop is running (scene on screen).
      if (rafId === null) return

      const tagName = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : ""
      if (tagName === "input" || tagName === "textarea") return

      const key = event.key === " " ? "space" : event.key.toLowerCase()
      if (key === "arrowleft" || key === "a") {
        keyState.left = isPressed
        event.preventDefault()
      }

      if (key === "arrowright" || key === "d") {
        keyState.right = isPressed
        event.preventDefault()
      }

      // Space and ArrowUp normally scroll the page, so they only jump
      // while the scene itself is focused. W is safe to handle globally.
      const sceneFocused = document.activeElement === sceneEl
      if (key === "w" || ((key === "space" || key === "arrowup") && sceneFocused)) {
        if (isPressed) jump()
        event.preventDefault()
      }
    }

    function bindHoldControl(button, direction) {
      if (!button) return

      const activate = () => {
        touchState[direction] = true
        button.classList.add("pressed")
        sceneEl.focus({ preventScroll: true })
      }

      const deactivate = () => {
        touchState[direction] = false
        button.classList.remove("pressed")
      }

      button.addEventListener("pointerdown", activate)
      button.addEventListener("pointerup", deactivate)
      button.addEventListener("pointerleave", deactivate)
      button.addEventListener("pointercancel", deactivate)
      button.addEventListener("lostpointercapture", deactivate)
    }

    renderExperienceWorld()
    setDetails(null)
    updateHud()
    updateSceneMetrics()
    sceneEl.addEventListener("click", () => sceneEl.focus({ preventScroll: true }))
    window.addEventListener("resize", updateSceneMetrics)
    window.addEventListener("keydown", (event) => handleKeyChange(event, true))
    window.addEventListener("keyup", (event) => handleKeyChange(event, false))
    window.addEventListener("blur", () => {
      keyState.left = false
      keyState.right = false
      touchState.left = false
      touchState.right = false
      if (moveLeftBtn) moveLeftBtn.classList.remove("pressed")
      if (moveRightBtn) moveRightBtn.classList.remove("pressed")
    })
    bindHoldControl(moveLeftBtn, "left")
    bindHoldControl(moveRightBtn, "right")
    if (moveJumpBtn) {
      moveJumpBtn.addEventListener("pointerdown", () => {
        jump()
        sceneEl.focus({ preventScroll: true })
      })
    }

    // Run the game loop only while the scene is on screen.
    if ("IntersectionObserver" in window) {
      const loopObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => (entry.isIntersecting ? startLoop() : stopLoop()))
        },
        { threshold: 0.05 },
      )
      loopObserver.observe(sceneEl)
    } else {
      startLoop()
    }

    return { remeasure: updateSceneMetrics }
  }

  // ---------------------- Screenshot lightbox ----------------------
  /**
   * Progressive enhancement: the thumbnails are plain links to the full-size
   * image, so without JS (or without <dialog> support) clicking still works.
   */
  /**
   * Hide any figure whose screenshot isn't on disk yet, so a shot that hasn't
   * been captured shows nothing rather than a broken image. Once the file
   * exists the figure appears on its own, with no markup change needed.
   */
  qsa(".case-shot img").forEach((img) => {
    const fail = () => {
      const figure = img.closest(".case-shot")
      if (!figure) return
      figure.hidden = true

      // Collapse the container too once nothing in it is left to show, or its
      // margin would leave a gap where the gallery used to be.
      const group = figure.closest(".case-shots")
      if (group && !qs(".case-shot:not([hidden])", group)) group.hidden = true
    }
    // A cached failure can land before this handler is attached.
    if (img.complete && img.naturalWidth === 0) fail()
    img.addEventListener("error", fail)
  })

  const lightbox = qs("#lightbox")
  const lightboxImage = qs("#lightbox-image")
  const lightboxClose = qs("#lightbox-close")

  if (lightbox && lightboxImage && typeof lightbox.showModal === "function") {
    qsa("[data-lightbox]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        const full = link.getAttribute("href")
        const thumb = qs("img", link)
        lightboxImage.src = full
        lightboxImage.alt = thumb ? thumb.alt : ""
        lightbox.showModal()
      })
    })

    if (lightboxClose) lightboxClose.addEventListener("click", () => lightbox.close())

    // Clicking the backdrop (i.e. outside the image) closes it too.
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close()
    })

    // Drop the source on close so a reopened lightbox never flashes the previous
    // shot. removeAttribute, not src = "" — an empty src resolves to the page URL
    // and makes the browser refetch the document as an image.
    lightbox.addEventListener("close", () => {
      lightboxImage.removeAttribute("src")
    })
  }

  // ---------------------- Experience: timeline / game switch ----------------------
  /**
   * The timeline is the default view; the game swaps in for it. Without
   * scripting the switch stays hidden and only the timeline is shown.
   */
  const viewTimelineBtn = qs("#view-timeline")
  const viewGameBtn = qs("#view-game")
  const timelineView = qs("#experience-timeline")
  const gameView = qs("#experience-game")
  const experienceSection = qs("#experience")

  if (viewTimelineBtn && viewGameBtn && timelineView && gameView) {
    let game = null

    const showView = (view) => {
      const playing = view === "game"
      timelineView.hidden = playing
      gameView.hidden = !playing
      viewTimelineBtn.setAttribute("aria-pressed", String(!playing))
      viewGameBtn.setAttribute("aria-pressed", String(playing))

      if (!playing) return
      // Build on first open, once the scene has a real width to measure.
      if (!game) {
        game = initCareerGame() || {}
      } else if (game.remeasure) {
        game.remeasure()
      }
    }

    viewTimelineBtn.addEventListener("click", () => showView("timeline"))
    viewGameBtn.addEventListener("click", () => showView("game"))

    // Shortcut from the hero: open the game view and jump to the section.
    qsa("[data-play-game]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        showView("game")
        if (experienceSection) glideToSection(experienceSection)
        viewGameBtn.focus({ preventScroll: true })
      })
    })
  }

  // ============================================================
  //  MOTION
  //  Everything below is decoration layered on readable markup.
  //  Motion starts on. html.motion-off (set from the nav toggle and
  //  remembered) keeps the fades but drops movement, loops, and
  //  scroll-linked effects.
  // ============================================================
  const root = document.documentElement
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
  const motionOn = () => !root.classList.contains("motion-off")
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  // ---------------------- Motion: toggle ----------------------
  const motionToggle = qs("#motion-toggle")
  const flowSvg = qs("#flow-svg")
  const orbitalScene = qs(".orbital-scene")
  let desk = null

  function applyMotion(on, save) {
    root.classList.toggle("motion-off", !on)
    if (desk) desk.setMotion(on)
    if (!on && orbitalScene) {
      orbitalScene.style.removeProperty("--look-x")
      orbitalScene.style.removeProperty("--look-y")
    }
    if (motionToggle) {
      motionToggle.setAttribute("aria-pressed", String(on))
      motionToggle.title = on ? "Turn animations off" : "Turn animations on"
    }
    if (flowSvg && typeof flowSvg.pauseAnimations === "function") {
      on ? flowSvg.unpauseAnimations() : flowSvg.pauseAnimations()
    }
    if (save) {
      try {
        localStorage.setItem("motion", on ? "on" : "off")
      } catch (error) {
        // Storage can be blocked; the choice then lasts for this visit only.
      }
    }
    if (!on) settleCounters()
    requestScrollUpdate()
  }

  if (motionToggle) {
    motionToggle.setAttribute("aria-label", "Animations")
    motionToggle.addEventListener("click", () => applyMotion(!motionOn(), true))
  }

  // ---------------------- Motion: section glide ----------------------
  // Links to a section and the section magnet share one eased scroll, so a second click
  // takes over a glide still under way instead of leaning on the browser's anchor scroll.
  // When the reader stops a little short of a section's start (or a little past it), the
  // page eases the rest of the way, so the change of section is felt while scrolling.
  const MAGNET_AHEAD = 0.25 // how far before a section's start the magnet reaches, in screens
  const MAGNET_BEHIND = 0.05 // how far past a section's start it still settles back onto it
  const MAGNET_QUIET = 240 // ms without scrolling before the magnet decides; outlasts a wheel notch
  const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "])
  let glide = null // the running glide: { from, to, start, duration }
  let glideFrame = 0
  let glideEnded = 0
  let magnetTimer = 0
  let held = false // a finger or mouse button is down, so the reader is still steering
  let heldScroll = false // the page scrolled while held, e.g. a scrollbar drag
  let glideY = window.scrollY
  let glideDir = 1

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const easeOut = (t) => 1 - Math.pow(1 - t, 3) // taking over a glide in motion keeps its speed
  const maxY = () => document.documentElement.scrollHeight - window.innerHeight

  // Where the page rests with a section at the top, below the fixed nav.
  function restY(section) {
    const pad = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
    return clamp(Math.round(pageTop(section) - pad), 0, maxY())
  }

  function stopGlide() {
    if (glideFrame) window.cancelAnimationFrame(glideFrame)
    glideFrame = 0
    glide = null
  }

  function glideTo(to, duration) {
    const curve = glide ? easeOut : ease
    stopGlide()
    if (Math.abs(to - window.scrollY) < 2) return
    if (!motionOn()) {
      window.scrollTo({ top: to, behavior: "instant" })
      return
    }
    const run = { from: window.scrollY, to, start: performance.now(), duration }
    glide = run
    // Frames can stall (a throttled or backgrounded tab); the scroll still has to land.
    window.setTimeout(() => {
      if (glide !== run) return
      stopGlide()
      window.scrollTo({ top: to, behavior: "instant" })
      glideEnded = performance.now()
    }, duration + 250)
    const step = (now) => {
      const t = clamp((now - run.start) / run.duration, 0, 1)
      window.scrollTo({ top: run.from + (run.to - run.from) * curve(t), behavior: "instant" })
      if (t < 1) {
        glideFrame = window.requestAnimationFrame(step)
        return
      }
      glideFrame = 0
      glide = null
      glideEnded = performance.now()
    }
    glideFrame = window.requestAnimationFrame(step)
  }

  function glideToSection(section) {
    const to = restY(section)
    glideTo(to, Math.min(1100, 420 + Math.sqrt(Math.abs(to - window.scrollY)) * 9))
  }

  function magnet() {
    magnetTimer = 0
    if (held || glide || !motionOn() || performance.now() - glideEnded < MAGNET_QUIET * 2) return
    const y = window.scrollY
    const vh = window.innerHeight
    if (desk && desk.owns()) return // the desk camera keeps the page inside the section on screen
    let best = null
    sections.forEach((section) => {
      const to = restY(section)
      const gap = Math.abs(to - y)
      const reach = (to - y) * glideDir > 0 ? MAGNET_AHEAD * vh : MAGNET_BEHIND * vh
      if (gap < 2 || gap > reach) return
      if (best === null || gap < Math.abs(best - y)) best = to
    })
    if (best !== null) glideTo(best, 260 + Math.sqrt(Math.abs(best - y)) * 12)
  }

  function armMagnet() {
    window.clearTimeout(magnetTimer)
    magnetTimer = window.setTimeout(magnet, MAGNET_QUIET)
  }

  window.addEventListener("scroll", () => {
    const y = window.scrollY
    if (y !== glideY) glideDir = y > glideY ? 1 : -1
    glideY = y
    if (held) heldScroll = true
    if (!glide) armMagnet()
  }, { passive: true })

  // Any hand on the page takes over from a glide.
  const grab = () => {
    held = true
    heldScroll = false
    stopGlide()
  }
  const release = () => {
    held = false
    if (heldScroll) armMagnet()
  }
  window.addEventListener("wheel", stopGlide, { passive: true })
  window.addEventListener("touchstart", grab, { passive: true })
  window.addEventListener("touchend", release, { passive: true })
  window.addEventListener("touchcancel", release, { passive: true })
  window.addEventListener("mousedown", grab)
  window.addEventListener("mouseup", release)
  window.addEventListener("keydown", (event) => {
    if (SCROLL_KEYS.has(event.key)) stopGlide()
  })

  // Links to a section glide there. Other in-page links keep the browser's own jump.
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest && event.target.closest('a[href^="#"]')
    const hash = link && link.getAttribute("href")
    const section = hash && hash.length > 1 && Array.from(sections).find((item) => `#${item.id}` === hash)
    if (!section) return
    event.preventDefault()
    if (location.hash !== hash) history.pushState(null, "", hash)
    // On wide screens the desk camera flies there; otherwise the page glides.
    if (!(desk && desk.go(section))) glideToSection(section)
    // Move the keyboard's starting point to the section, as the browser's jump would.
    if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1")
    section.focus({ preventScroll: true })
  })

  // ---------------------- Orbital developer workspace ----------------------
  if (orbitalScene) {
    const viewport = qs(".orbital-viewport", orbitalScene)
    const buttons = Array.from(qsa("[data-focus]", orbitalScene))
    const detail = qs("#scene-detail")
    const descriptions = {
      all: "Move your pointer to change perspective.",
      frontend: "Interfaces for real workflows. Vue, React, and SvelteKit.",
      backend: "APIs and business logic. Python, Django, .NET, and Node.js.",
      data: "Connected systems and reliable records. PostgreSQL and Oracle DB.",
    }
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        orbitalScene.dataset.focus = button.dataset.focus
        buttons.forEach(item => item.setAttribute("aria-pressed", String(item === button)))
        detail.textContent = descriptions[button.dataset.focus]
      })
      button.addEventListener("keydown", event => {
        let next
        if (event.key === "ArrowRight") next = (index + 1) % buttons.length
        if (event.key === "ArrowLeft") next = (index + buttons.length - 1) % buttons.length
        if (event.key === "Home") next = 0
        if (event.key === "End") next = buttons.length - 1
        if (next === undefined) return
        event.preventDefault()
        buttons[next].focus()
        buttons[next].click()
      })
    })
    viewport.addEventListener("pointermove", event => {
      if (!motionOn() || !finePointer.matches) return
      const rect = viewport.getBoundingClientRect()
      const x = clamp((event.clientX - rect.left) / rect.width - .5, -.5, .5)
      const y = clamp((event.clientY - rect.top) / rect.height - .5, -.5, .5)
      orbitalScene.style.setProperty("--look-x", `${x * 16}deg`)
      orbitalScene.style.setProperty("--look-y", `${-y * 12}deg`)
    })
    viewport.addEventListener("pointerleave", () => {
      orbitalScene.style.removeProperty("--look-x")
      orbitalScene.style.removeProperty("--look-y")
    })
    // Stop decorative animation when its scene is outside the viewport or tab is hidden.
    const sculptures = [orbitalScene, ...qsa(".service-sculpture, .system-map")]
    const visible = new Set(sculptures)
    const updateActivity = () => sculptures.forEach(el => {
      el.classList.toggle("scene-paused", document.hidden || !visible.has(el))
    })
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target))
        updateActivity()
      })
      sculptures.forEach(el => observer.observe(el))
    }
    document.addEventListener("visibilitychange", updateActivity)
  }

  // ---------------------- Desk stage: the lo-fi background ----------------------
  // JB at his desk between two monitors. Station A: JB on the left, at the monitor on the
  // right. Station B: mirrored, at the other monitor. Sections take the stations in turn, so
  // what you read sits where he is looking. While you scroll he works; once you stop he sips
  // his coffee, like a lo-fi stream. Around each change of section the scroll steers his
  // chair and the camera to the other monitor: scroll on and he swings across, scroll back
  // and he swings back, as fast as you go; stop, and he settles on the side you are reading.
  //
  // Every clip starts and ends on its station's rest frame, so any clip can follow any other
  // at a station. tools/desk-clips/ renders them.
  //
  // On wide screens the sections are what is on his monitors. Asking for a section flies the
  // camera into the screen until the glass fills the window and the section is simply the
  // page; asking for the next pulls back out to the room, he turns, and the camera dives into
  // the other monitor. The flight runs on a clock, not on the scroll. See "The camera" below.
  function initDesk(stage) {
    const frameEl = qs("#desk-frame", stage)
    const holo = qs("#desk-holo", stage)
    const hudState = qs("#desk-hud-state", stage)
    const hudScene = qs("#desk-hud-scene", stage)
    const wideQuery = window.matchMedia("(min-width: 1100px) and (min-aspect-ratio: 5/4)")
    const FPS = 24
    // Clips per station. An empty name means there is no footage for it yet; it is skipped.
    // `more` are other work actions; at rest he moves between them and the main loop.
    const CLIPS = {
      a: { work: "desk-a-work", more: [], sip: "desk-a-sip", turn: "desk-a-to-b", label: "reviewing" },
      b: { work: "desk-b-work", more: ["desk-b-type"], sip: "desk-b-sip", turn: "desk-b-to-a", label: "typing" },
    }
    // The turns, steered by the scroll. Each also comes reversed (name-rev) so he can swing back,
    // and the layout swaps sides at the frame where the chair back fills the shot. B to A is the
    // A to B take played backwards, and its ends are the two rest frames, so nothing is blended.
    const TURNS = {
      "desk-a-to-b": { from: "a", to: "b", frames: 185, swap: 70 },
      "desk-b-to-a": { from: "b", to: "a", frames: 185, swap: 114 },
    }
    // A turn spans STEER screens of scrolling around its change of section, which falls on the
    // swap frame. He catches up with the scroll within CATCH seconds, at up to SWING times
    // normal speed; once the reader stops, he carries on at GLIDE to the side being read.
    const STEER = 1.2
    const SWING = 4
    const READ = 0.3 // the reading line, as a fraction of the viewport from the top
    const CATCH = 0.15
    const GLIDE = 1.3
    const GLIDE_AFTER = 600 // ms without scrolling before he settles back against the scroll
    const ENGAGE = 4 // frames the scroll must lead him by before he leaves his desk
    // A reader scrolling fast hurries a sip too: at `pace` screens a second it plays at `max`.
    const RUSH = { pace: 1.5, max: 3 }
    // He sips only once the reader has stopped scrolling for a moment, then waits before the next.
    const IDLE_MS = 1800
    const SIP_GAP_MS = [6000, 11000]
    // Every clip at rest is a boomerang: out to a peak and back the same way. A turn that comes
    // mid-clip jumps to the same picture on the way back and hurries him home at this rate.
    const HURRY = 2
    // Where his eyeline meets the monitor, as fractions of the source frame.
    const EYELINE = { a: [0.69, 0.44], b: [0.31, 0.4] }
    // Narrow screens crop the frame to JB himself (object-position x, in %).
    const FOCUS = { a: 24, b: 76 }
    const EMBLEMS = { services: "workflow", approach: "orbit", work: "laptop", experience: "db", reference: "quote", skills: "cube", about: "browser", speaking: "db", contact: "workflow" }
    const SOURCES = { laptop: ".object-laptop .laptop", cube: ".object-api .code-cube", db: ".object-db .database", workflow: ".object-workflow .workflow-tile", orbit: ".sculpture-automate .service-orbit", browser: ".sculpture-build .mini-browser", quote: ".quote-mark" }
    const STATES = { sip: "sipping coffee", moving: "switching monitors", paused: "paused", inside: "on screen" }
    // The camera. Each monitor's screen in its station's rest frame, measured on a frame
    // SRC in size: top left, top right, bottom right, bottom left. A's bottom right corner is
    // below the picture. Station A's own clips ease off the rest frame over their first and
    // last SETTLE frames and hold the picture a few pixels over in between; `settle` is where
    // that leaves each corner, so the glass follows the monitor through the clip.
    const screenEl = qs("#desk-screen", stage)
    const SRC = [1920, 1080]
    const SCREENS = {
      a: { quad: [[1381, 316], [1897, 131], [1838, 1136], [1352, 839]], settle: [[3.5, -2], [7, -3], [4.6, 3.5], [2, 2]] },
      b: { quad: [[80, 143], [696, 246], [697, 738], [88, 818]], settle: null },
    }
    const SETTLE = 5.5
    const ASPECT = 16 / 9 // the monitors' own shape; the glass covers the window at this shape
    // The camera flies on a clock, never on the scroll: a wheel notch, a key or a link only
    // says where to go, and the flight plays out whole, however long the stride was.
    const DIVE_IN = 1.15 // seconds to fly into a monitor
    const DIVE_OUT = 0.85 // seconds to pull back out to the room
    const TURN_RATE = 4 // how fast he turns to the other monitor while the camera waits
    const RUSH_GAIN = 0.8 // a reader still scrolling mid-flight speeds it up, by up to this much
    const SPRING = 13 // how stiffly the page follows the wheel inside a section (a damped spring)
    const PUSH = 40 // px of wheel past a section's end that ask for the next section
    const EDGE_HOLD = 320 // ms a section's end resists, so the stride that reached it stops there
    const LAND_COOL = 320 // ms after landing before the wheel can leave again
    const GLASS = 0.07 // how far into a dive the screen has switched over to the page
    const BEZEL = 0.007 // the bezel's width, as a share of the glass's
    const connection = navigator.connection
    const lowData = !!(connection && (connection.saveData || /(^|-)(2g|3g)$/.test(connection.effectiveType || "")))

    const scenes = Array.from(qsa("main > section[id]")).map((section) => {
      const heading = qs(".section-heading", section)
      const eyebrow = qs(".eyebrow", section)
      // The content that covers his eyeline: everything after the title.
      let body = heading ? heading.nextElementSibling : qs(".section-container", section)
      if (section.id === "hero") body = qs(".hero-visual", section)
      if (section.id === "skills") body = qs(".marquee-group", section)
      return { section, station: "a", top: 0, height: 0, lo: 0, hi: 0, body, emblem: EMBLEMS[section.id] || "", label: section.id === "hero" ? "Intro" : (eyebrow ? eyebrow.textContent.trim() : section.id) }
    })

    // The emblems are copies of the 3D objects already on the page.
    const emblems = {}
    Object.entries(SOURCES).forEach(([name, selector]) => {
      const source = qs(selector)
      if (!source) return
      const wrap = document.createElement("div")
      const body = document.createElement("div")
      const copy = source.cloneNode(true)
      copy.removeAttribute("data-reveal")
      wrap.className = "holo-emblem"
      wrap.dataset.emblem = name
      body.className = "holo-body"
      body.appendChild(copy)
      wrap.appendChild(body)
      holo.appendChild(wrap)
      emblems[name] = wrap
    })

    const vids = {} // clip name -> video element
    let station = "a" // where JB is
    let target = "a" // where the section under the reading line wants him
    let active = scenes[0]
    let current = "" // the clip on screen
    let moving = false
    let live = false // clips are on screen
    let started = false // clips requested
    let lastScroll = performance.now()
    let lastY = window.scrollY
    let scrollDir = 1
    let pace = 0 // how fast the reader is scrolling, in screens a second
    let steer = null // the turn under way: { clip, rev, v, rate, seeking, locked }
    let driving = false
    let geo = null
    let geoAt = 0
    let anchor = null // where in a zone he came to rest: { at, side, p }
    let starting = 0 // the latest clip asked for; an older start that resolves late is dropped
    let nextSipAt = 0
    let hurrying = null // the sip being hurried along so the turn can start
    let holding = false // waiting on his rest frame for the camera to come out of the screen
    let holoY = 0
    let holoScale = 1

    const other = (side) => (side === "a" ? "b" : "a")
    const ready = (name) => !!name && !!vids[name] && vids[name].readyState >= 3
    const isSip = (name) => !!name && (name === CLIPS.a.sip || name === CLIPS.b.sip)
    const works = (side) => [CLIPS[side].work, ...CLIPS[side].more].filter(Boolean)
    const isWork = (name) => !!name && (works("a").includes(name) || works("b").includes(name))

    // What to play at rest when the current clip gets back to it.
    function chooseNext() {
      const set = CLIPS[station]
      const now = performance.now()
      if (ready(set.sip) && now - lastScroll >= IDLE_MS && now >= nextSipAt) return set.sip
      // Work: never the same action twice running when there is another to go to.
      const options = works(station).filter((name) => ready(name) && name !== current)
      return options.length ? options[Math.floor(Math.random() * options.length)] : set.work
    }

    function rewind(v) {
      return new Promise((resolve) => {
        if (v.currentTime < 0.5 / FPS) return resolve()
        v.addEventListener("seeked", () => resolve(), { once: true })
        v.currentTime = 0
      })
    }

    // A rewound clip's first frame is ready to paint, so it can go on screen before it plays.
    function swapTo(v) {
      const old = Object.values(vids).filter((o) => o !== v && o.classList.contains("is-on"))
      const hide = (o) => {
        if (o === vids[current]) return
        o.classList.remove("is-on", "is-front")
        o.pause()
      }
      old.forEach((o) => o.classList.remove("is-front"))
      if (!v) return old.forEach(hide)
      v.classList.add("is-on", "is-front")
      old.forEach(hide)
    }

    function start(name) {
      const v = vids[name]
      const token = ++starting
      rewind(v).then(() => {
        if (!live || token !== starting) return
        current = name
        swapTo(v)
        v.loop = false
        v.playbackRate = 1
        const attempt = v.play()
        if (attempt) attempt.catch(() => stopLive())
        if (isSip(name)) nextSipAt = Infinity
        update()
      })
    }

    // A clip's rate for how fast the reader is scrolling right now: base when reading, up to
    // RUSH.max when racing through the page. The pace fades within a moment of the scrolling.
    function paced(base) {
      const now = performance.now()
      const p = pace * Math.exp(-(now - lastScroll) / 300)
      return base + Math.max(0, RUSH.max - base) * Math.min(1, p / RUSH.pace)
    }

    // Every clip ends on rest, so whatever comes next can start straight away.
    function advance() {
      if (!live) return
      const name = chooseNext()
      if (!ready(name)) {
        current = ""
        return swapTo(null) // the stills show until it loads
      }
      start(name)
    }

    function finished(name) {
      if (steer) return // the steering decides when a turn is over
      if (isSip(name)) nextSipAt = performance.now() + SIP_GAP_MS[0] + Math.random() * (SIP_GAP_MS[1] - SIP_GAP_MS[0])
      const w = wanted(station)
      if (w) return engage(w) // back at rest: straight into the turn
      if (cam.leaving) {
        holding = true // the turn follows as soon as the camera is out
        return
      }
      advance()
    }

    // A work clip loops natively until something else is due, then runs out to rest.
    function onTime(name) {
      if (name !== current) return
      if (isWork(name)) vids[name].loop = hurrying !== vids[name] && chooseNext() === name
      hud()
    }

    function load() {
      if (started || lowData) return
      started = true
      // One at a time, in the order they will be needed, so the first loop arrives quickly.
      // The reversed turns come last: they are only needed to swing back.
      const names = []
      ;[station, other(station)].forEach((side) => ["work", "sip", "turn"].forEach((key) => {
        if (CLIPS[side][key]) names.push(CLIPS[side][key])
      }))
      ;[station, other(station)].forEach((side) => { if (CLIPS[side].turn) names.push(`${CLIPS[side].turn}-rev`) })
      ;[station, other(station)].forEach((side) => CLIPS[side].more.forEach((name) => names.push(name)))
      names.forEach((name) => {
        const v = document.createElement("video")
        v.className = "desk-clip"
        v.muted = true
        v.defaultMuted = true
        v.playsInline = true
        v.setAttribute("playsinline", "")
        v.disablePictureInPicture = true
        v.preload = "none"
        v.dataset.clip = name
        v.addEventListener("ended", () => { if (live && name === current) finished(name) })
        v.addEventListener("timeupdate", () => onTime(name))
        frameEl.appendChild(v)
        vids[name] = v
      })
      // He goes live as soon as the work clip for the monitor he should be at has arrived,
      // which may not be the first one if the page opened part way down.
      const go = () => { if (!live && motionOn() && !document.hidden) goLive() }
      names.reduce((chain, name) => chain.then(() => fetchClip(vids[name])).then(go), Promise.resolve())
      const first = vids[CLIPS[station].work]
      if (first.readyState >= 3) go()
      else first.addEventListener("canplay", go, { once: true })
    }

    // Each clip is fetched whole and played from memory, so it can be sought anywhere even on a
    // server without range requests: a turn swinging back seeks into its reversed copy. Where
    // fetch is not allowed (the page opened from disk), the clip streams as usual.
    function fetchClip(v) {
      const url = `img/desk/${v.dataset.clip}.mp4`
      const use = (src) => new Promise((resolve) => {
        v.addEventListener("canplaythrough", resolve, { once: true })
        v.addEventListener("error", resolve, { once: true })
        v.preload = "auto"
        v.src = src
        v.load()
      })
      if (location.protocol === "file:") return use(url)
      return fetch(url)
        .then((response) => (response.ok ? response.blob() : Promise.reject(new Error(String(response.status)))))
        .then((blob) => use(URL.createObjectURL(blob)), () => use(url))
    }

    function goLive() {
      if (live || !ready(CLIPS[target].work)) return
      live = true
      stage.dataset.live = "true"
      stage.dataset.moving = "false"
      setStation(target) // no need to turn on the way in
      advance()
      if (!driving) {
        driving = true
        window.requestAnimationFrame(drive)
      }
    }

    function stopLive() {
      live = false
      steer = null
      moving = false
      holding = false
      current = ""
      stage.dataset.live = "false"
      stage.dataset.moving = "false"
      Object.values(vids).forEach((v) => v.pause())
      swapTo(null)
      setStation(target)
      update()
    }

    function setStation(side) {
      if (side === station && stage.dataset.station === side) return
      station = side
      stage.dataset.station = side
      frame()
    }

    // ---- Steering: the scroll drives the turns ----
    // Each change of section has a zone of scrolling around it. Within it, p runs from 0 (the
    // upper section's side) to 1 (the lower one's), and the change itself is at p = sw.
    function zones() {
      const now = performance.now()
      if (geo && now - geoAt < 1000) return geo
      geo = []
      geoAt = now
      if (cam.fly) return geo // the camera decides where he sits, not the scroll
      const vh = window.innerHeight
      const y0 = window.scrollY
      const rects = scenes.map((scene) => scene.section.getBoundingClientRect())
      for (let k = 0; k + 1 < scenes.length; k++) {
        const above = scenes[k].station
        const below = scenes[k + 1].station
        const clip = CLIPS[above].turn
        const t = TURNS[clip]
        if (!t || above === below) continue
        const sw = t.swap / (t.frames - 1)
        const len = Math.min(STEER * vh, 0.8 * Math.min(rects[k].height, rects[k + 1].height))
        const at = rects[k + 1].top + y0 - READ * vh
        geo.push({ clip, above, below, sw, at, start: at - sw * len, len })
      }
      return geo
    }

    function zoneAt(y) {
      const z = zones().find((item) => y > item.start && y < item.start + item.len)
      return z ? { ...z, p: (y - z.start) / z.len } : null
    }

    // The side of the section at the reading line.
    function sideAt(y) {
      if (cam.fly) return cam.dest.station
      let side = scenes[0].station
      zones().forEach((z) => { if (y >= z.at) side = z.below })
      return side
    }

    // Where the scroll wants him in a zone, for a turn at c (0..1 along its forward copy).
    // While the reader scrolls, the part of the zone between lo and hi maps onto the whole turn
    // and he only moves the way they are going; once they stop he settles on the side being
    // read, at once if that is the way he was going, otherwise after a pause.
    function goalIn(z, c) {
      const quiet = performance.now() - lastScroll
      const settle = z.p >= z.sw ? 1 : 0
      if (quiet > GLIDE_AFTER) return settle
      if (quiet > 200 && (settle === 1) === (scrollDir > 0)) return settle
      const q = clamp((z.p - steer.lo) / Math.max(0.01, steer.hi - steer.lo), 0, 1)
      return scrollDir > 0 ? Math.max(c, q) : Math.min(c, q)
    }

    function goalFor(clip, c) {
      if (cam.fly) return cam.dest.station === TURNS[clip].to ? 1 : 0
      const y = window.scrollY
      const z = zoneAt(y)
      if (z && z.clip === clip) return goalIn(z, c)
      return sideAt(y) === TURNS[clip].to ? 1 : 0
    }

    // From rest at `side`: the turn the scroll asks for, which end of it he starts from, and
    // the stretch of the zone that maps onto it. He leaves his desk once the reader has
    // scrolled ENGAGE frames' worth past where he settled (the anchor), toward the other side.
    function wanted(side) {
      if (!live) return null
      if (cam.fly) {
        if (cam.c > 0.01) return null // the camera is in his screen: he stays where he is
        return cam.dest.station !== side ? { clip: CLIPS[side].turn, end: 0, lo: 0, hi: 1 } : null
      }
      const y = window.scrollY
      const z = zoneAt(y)
      if (!z) return sideAt(y) !== side ? { clip: CLIPS[side].turn, end: 0, lo: 0, hi: 1 } : null
      const end = side === z.above ? 0 : 1
      const n = TURNS[z.clip].frames - 1
      let a = anchor && anchor.at === z.at && anchor.side === side ? anchor.p : end
      if (end === 0 ? z.p < a : z.p > a) a = z.p // the reader moved further his way: follow
      anchor = { at: z.at, side, p: a }
      const span = end === 0 ? { lo: a, hi: 1 } : { lo: 0, hi: a }
      const w = { clip: z.clip, end, ...span }
      if (performance.now() - lastScroll > GLIDE_AFTER) return (z.p >= z.sw ? 1 : 0) !== end ? w : null
      if (end === 0 && scrollDir > 0 && (z.p - a) * n >= ENGAGE) return w
      if (end === 1 && scrollDir < 0 && (a - z.p) * n >= ENGAGE) return w
      return null
    }

    // Start a turn from rest: forward from its first frame, or reversed from its last.
    function engage(w) {
      const name = w.end ? `${w.clip}-rev` : w.clip
      if (!ready(name)) {
        // Not loaded yet: cut across once the reader has moved on to the other side.
        const side = sideAt(window.scrollY)
        if (side !== station) {
          setStation(side)
          advance()
        }
        return
      }
      steer = { clip: w.clip, rev: !!w.end, v: vids[name], lo: w.lo, hi: w.hi, rate: 1, seeking: false, locked: false }
      moving = true
      stage.dataset.moving = "true"
      start(name)
    }

    function arrive(side) {
      steer = null
      moving = false
      stage.dataset.moving = "false"
      setStation(side)
      nextSipAt = performance.now() + SIP_GAP_MS[0] // he settles in at the new monitor first
      const z = zoneAt(window.scrollY)
      anchor = z ? { at: z.at, side, p: z.p } : null
      const w = wanted(side)
      if (w) return engage(w)
      advance()
    }

    // Turn around mid-turn: carry on in the other copy of the turn, from the same frame.
    function reverse(s, f) {
      const name = s.rev ? s.clip : `${s.clip}-rev`
      const v = vids[name]
      if (!ready(name)) {
        s.locked = true // the other copy has not loaded yet: finish this way
        return
      }
      const n = TURNS[s.clip].frames - 1
      const at = n - Math.round(f)
      s.seeking = true
      s.v.pause()
      v.addEventListener("seeked", () => {
        s.seeking = false
        if (steer !== s || !live) return
        if (Math.abs(v.currentTime * FPS - at) > 1.5) {
          s.locked = true // the seek did not land: finish this way rather than jump
          return
        }
        s.rev = !s.rev
        s.v = v
        current = name
        swapTo(v)
        v.playbackRate = Math.max(0.1, s.rate)
        v.play().catch(() => {})
      }, { once: true })
      v.currentTime = (at + 0.3) / FPS
    }

    function steerTurn() {
      const s = steer
      const t = TURNS[s.clip]
      const n = t.frames - 1
      const v = vids[current]
      if (v !== s.v || s.seeking) return
      const f = Math.min(n, v.currentTime * FPS)
      const c = s.rev ? 1 - f / n : f / n
      setStation(c * n >= t.swap ? t.to : t.from)
      const goal = s.locked ? (s.rev ? 0 : 1) : goalFor(s.clip, c)
      // The turn's ends are the rest frames themselves, so he arrives only on the last one.
      if ((goal === 1 && c * n >= n - 0.6) || (goal === 0 && c * n <= 0.6)) return arrive(goal ? t.to : t.from)
      const gap = (goal - c) * n
      if (Math.abs(gap) >= 0.5 && (gap > 0) === s.rev) return reverse(s, f)
      const quiet = performance.now() - lastScroll > 200
      // With the camera, the reader is waiting on him: he swings across at a steady clip.
      const rate = cam.fly ? TURN_RATE * (1 + 0.3 * cam.rush) : quiet && (goal === 0 || goal === 1) ? GLIDE : Math.min(SWING, Math.abs(gap) / FPS / CATCH)
      s.rate += (rate - s.rate) * 0.25
      if (s.rate < 0.07 || Math.abs(gap) < 0.5) {
        if (!v.paused) v.pause()
        return
      }
      if (Math.abs(v.playbackRate - s.rate) > 0.03) v.playbackRate = s.rate
      if (v.paused) v.play().catch(() => {})
    }

    // Once a frame while the clips are live: steer the turn under way, or start one from rest.
    function drive() {
      if (!live) {
        driving = false
        return
      }
      window.requestAnimationFrame(drive)
      if (document.hidden) return
      if (steer) return steerTurn()
      const v = vids[current]
      const w = v && wanted(station)
      if (!w) {
        if (!v) return
        // The camera is pulling out toward a turn: he comes back to rest meanwhile and holds
        // there, so the turn can start the moment it is out.
        if (cam.leaving) {
          if (holding) return
          if (v.currentTime * FPS < 1 || v.ended) {
            v.pause()
            holding = true
          } else if (cam.c > 0.97 && !v.seeking && hurrying !== v) {
            // The glass still fills the window: nobody can see him, so he is simply at rest.
            v.pause()
            v.currentTime = 0
            if (isSip(current)) nextSipAt = performance.now() + SIP_GAP_MS[0]
            holding = true
          } else homeward(v)
          return
        }
        if (holding) {
          holding = false // the reader went back in: carry on working
          advance()
        }
        return
      }
      holding = false
      if (v.currentTime * FPS < 1 || v.ended) return engage(w)
      homeward(v) // the turn follows from rest
    }

    // Mid-clip, he goes home the way he came: on the way out, jump to the same picture on the
    // way back (the boomerang's mirror frame), then hurry the rest.
    function homeward(v) {
      if (v.seeking || hurrying === v) return
      const n = Math.round(v.duration * FPS)
      const f = Math.round(v.currentTime * FPS)
      v.loop = false
      if (f >= n / 2) return hurry(v)
      v.addEventListener("seeked", () => hurry(v), { once: true })
      v.currentTime = (n - f + 0.3) / FPS
    }

    // If the reader comes back to this side first, the clip carries on at its own pace.
    function hurry(v) {
      if (hurrying === v) return
      hurrying = v
      const tick = () => {
        if (live && vids[current] === v && !steer && (cam.leaving || wanted(station))) {
          const rate = cam.fly ? Math.max(paced(HURRY), RUSH.max) : paced(HURRY)
          if (Math.abs(v.playbackRate - rate) > 0.05) v.playbackRate = rate
          return window.requestAnimationFrame(tick)
        }
        hurrying = null
        if (live && vids[current] === v) v.playbackRate = 1
      }
      window.requestAnimationFrame(tick)
    }

    // ---- The camera: into the screen and back out ----
    // cam.c runs from 0 (the room) to 1 (inside the screen). The clip frame, the glass and the
    // section on it are drawn with one projective map each, all taken from where the screen's
    // four corners are right now, so the section stays on the monitor the whole way: nothing
    // is cut or cross-faded. At 1 the map is the identity and the section is the page itself.
    //
    // The camera flies on a clock. The reader only says where to go: a wheel notch or a key at
    // the end of a section asks for the next one, a link asks for its own. The flight then
    // plays out whole (out of the screen, his turn, into the other one) at its own pace, a
    // little faster if they keep scrolling. So a long wheel stride moves it exactly as far as
    // a short one, and no part of it is ever skipped.
    let touched = false // the reader has scrolled by hand since the page opened
    ;["wheel", "touchstart", "keydown", "mousedown"].forEach((type) => {
      window.addEventListener(type, () => { touched = true }, { once: true, passive: true })
    })
    const cam = {
      on: false, // wide: the sections are what is on his monitors
      fly: false, // ...and the camera flies between them (motion on, a mouse or a trackpad)
      running: false,
      aligned: false,
      rest: true, // landed: in the room with the intro, or inside the section being read
      leaving: false, // pulling out toward a turn
      p: 0, // how far through the dive, on the clock
      v: 0, // and how fast, in dives a second
      c: 0, // p eased: slow off the mark, fast through the middle, soft at the glass
      shown: null, // the section on the glass
      inside: null,
      dest: scenes[0], // where the reader asked to go
      from: scenes[0], // and where they asked from
      home: scenes[0], // where they last landed
      held: scenes[0], // the section whose stretch of the page the scroll is kept in
      entry: "top",
      rush: 0,
      hero: 1,
      bars: 0,
      sweep: 0,
      at: 0,
      lay: 0,
      landed: 0,
      lock: 0,
      ring: -1e9,
      ringDir: 1,
      quad: null,
      vp: [0, 0],
      last: {},
    }
    // The page's own scroll. Inside a section the wheel moves `goal` and the page eases after
    // it; it never leaves the section on the glass until the glass is empty.
    const sc = { pos: window.scrollY, goal: window.scrollY, vel: 0, set: window.scrollY, own: window.scrollY, edge: 0, push: 0, pushDir: 0, pushAt: 0, back: 0 }
    const hudEl = qs("#scene-hud")
    const captionEl = qs("#scene-caption")
    const nextEl = qs("#scene-next-label")
    const railEl = qs("#scene-rail")
    const fxEl = qs("#desk-fx", stage)
    const fx = fxEl && fxEl.getContext ? fxEl.getContext("2d") : null
    const mono = getComputedStyle(root).getPropertyValue("--font-mono").trim() || "monospace"
    const TINTS = ["rgb(196,218,255)", "rgb(196,218,255)", "rgb(94,234,212)", "rgb(141,180,255)"]
    const streaks = Array.from({ length: 170 }, (_, i) => ({ a: Math.random() * Math.PI * 2, r: Math.random(), l: 0.05 + Math.random() * 0.12, s: 0.5 + Math.random(), w: 0.6 + Math.random() * 1.3, tint: TINTS[i % TINTS.length] }))
    let fxOn = false
    const railItems = []
    const lerp = (a, b, t) => a + (b - a) * t
    const smooth = (t) => {
      const x = clamp(t, 0, 1)
      return x * x * (3 - 2 * x)
    }
    // Projective maps as 3x3 matrices, in row order.
    const mul = (a, b) => [
      a[0] * b[0] + a[1] * b[3] + a[2] * b[6], a[0] * b[1] + a[1] * b[4] + a[2] * b[7], a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
      a[3] * b[0] + a[4] * b[3] + a[5] * b[6], a[3] * b[1] + a[4] * b[4] + a[5] * b[7], a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
      a[6] * b[0] + a[7] * b[3] + a[8] * b[6], a[6] * b[1] + a[7] * b[4] + a[8] * b[7], a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
    ]
    // The inverse, up to scale.
    const adj = (m) => [
      m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
      m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
      m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3],
    ]
    const shift = (x, y) => [1, 0, x, 0, 1, y, 0, 0, 1]
    // The map that takes the unit square onto the four corners q.
    function fromSquare(q) {
      const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q
      const dx1 = x1 - x2
      const dx2 = x3 - x2
      const sx = x0 - x1 + x2 - x3
      const dy1 = y1 - y2
      const dy2 = y3 - y2
      const sy = y0 - y1 + y2 - y3
      const den = dx1 * dy2 - dx2 * dy1
      const g = (sx * dy2 - dx2 * sy) / den
      const h = (dx1 * sy - sx * dy1) / den
      return [x1 - x0 + g * x1, x3 - x0 + h * x3, x0, y1 - y0 + g * y1, y3 - y0 + h * y3, y0, g, h, 1]
    }
    const toCss = (m) => {
      const n = (v) => +(v / m[8]).toFixed(9)
      return `matrix3d(${n(m[0])},${n(m[3])},0,${n(m[6])},${n(m[1])},${n(m[4])},0,${n(m[7])},0,0,1,0,${n(m[2])},${n(m[5])},0,1)`
    }
    // Styles are written only when they change.
    function put(key, el, prop, value) {
      if (cam.last[key] === value) return
      cam.last[key] = value
      el.style[prop] = value
    }
    function putVar(name, value) {
      if (cam.last[name] === value) return
      cam.last[name] = value
      stage.style.setProperty(name, value)
    }

    // Wide: the intro and the first section share his first monitor, then they take turns.
    function assign() {
      scenes.forEach((scene, index) => {
        scene.station = cam.on ? (index < 2 || index % 2 ? "a" : "b") : (index % 2 ? "b" : "a")
        scene.section.dataset.station = scene.station
      })
    }

    // Each section's stretch of the page: from its top at the top of the window (lo) to its
    // end at the bottom (hi). A section that fits the window has no stretch at all. The page
    // ends inside the last one, footer and all.
    function layout(now) {
      cam.lay = now
      geo = null
      const h = stage.clientHeight
      const end = document.documentElement.scrollHeight - h
      const was = cam.held.top
      scenes.forEach((scene, index) => {
        scene.top = scene.section.offsetTop
        scene.height = scene.section.offsetHeight
        scene.lo = index ? scene.top : 0
        scene.hi = Math.max(scene.lo, index === scenes.length - 1 ? end : scene.top + scene.height - h)
      })
      // Something above the reader changed height (a late image, a resize): keep their place.
      const moved = cam.held.top - was
      if (cam.fly && Math.abs(moved) > 0.5) {
        sc.pos += moved
        sc.goal += moved
        scrollNow(sc.pos)
      }
    }

    // The section a scroll position belongs to: the one under a line 40% down the window.
    function sceneAtY(y) {
      const line = y + 0.4 * stage.clientHeight
      let at = scenes[0]
      scenes.forEach((scene, index) => { if (index && line >= scene.top) at = scene })
      return at
    }

    function scrollNow(y) {
      window.scrollTo({ top: y, behavior: "instant" })
      sc.set = y
      sc.own = window.scrollY
    }

    // How far a clip at station A has eased off the rest frame: 0 at its ends, 1 in between.
    function settled() {
      const v = vids[current]
      if (!live || steer || !v || !(isWork(current) || isSip(current)) || !(v.duration > 0)) return 0
      const f = v.currentTime * FPS
      const n = Math.round(v.duration * FPS) - 1
      return smooth(Math.min(f - 0.5, n - f) / SETTLE)
    }

    function clearScene(scene) {
      const style = scene.section.style
      style.transform = ""
      style.clipPath = ""
      style.opacity = ""
      style.willChange = ""
      scene.section.classList.remove("is-shown", "is-inside")
      ;["s:transform", "s:clip", "s:opacity", "s:will"].forEach((key) => { delete cam.last[key] })
    }

    // Only one section is on the glass at a time, and it changes only while the glass is dark.
    function show(scene) {
      if (cam.shown) clearScene(cam.shown)
      cam.shown = scene
      cam.inside = null
      if (scene) scene.section.classList.add("is-shown")
    }

    // Where the page sits when a section is come into: its top, its end (coming back up from
    // the section below), or a place inside it.
    function entryY(scene) {
      if (cam.entry === "bottom") return scene.hi
      if (typeof cam.entry === "number") return clamp(cam.entry, scene.lo, scene.hi)
      return scene.lo
    }

    // Move the page to a section. Called only with nothing on the glass, so it is not seen.
    function hold(scene) {
      cam.held = scene
      sc.pos = sc.goal = entryY(scene)
      sc.vel = 0
      scrollNow(sc.pos)
    }

    // Be at a section at once, with no flight: the page opened part way down, a deep link,
    // or motion switched on.
    function enter(scene) {
      if (cam.shown) show(null)
      const intro = scene === scenes[0]
      cam.dest = cam.from = cam.home = cam.held = scene
      cam.rest = true
      cam.leaving = false
      cam.landed = performance.now()
      cam.rush = 0
      cam.v = 0
      cam.p = cam.c = intro ? 0 : 1
      cam.hero = intro ? 1 : 0
      target = scene.station
      // Behind the glass he can simply be at the right monitor.
      if (!live || (!intro && !steer && station !== target)) {
        setStation(target)
        if (live) advance()
      }
      if (!intro) show(scene)
      sc.pos = sc.goal = clamp(window.scrollY, scene.lo, scene.hi)
      sc.vel = 0
      sc.push = sc.back = 0
      scrollNow(sc.pos)
      active = scene
      hudScene.textContent = scene.label
    }

    // Ask the camera to go to a section. False when it is not flying, so the caller scrolls
    // the page the ordinary way.
    function go(scene, entry) {
      if (!cam.fly || !scene) return false
      if (scene === cam.dest) {
        // Already there, or on the way: a link to the section being read goes to its top.
        cam.entry = entry === undefined ? "top" : entry
        if (cam.rest) sc.goal = entryY(scene)
        return true
      }
      cam.from = cam.dest
      cam.dest = scene
      cam.entry = entry === undefined ? "top" : entry
      cam.rest = false
      target = scene.station
      sc.push = sc.back = 0
      active = scene
      hudScene.textContent = scene.label
      return true
    }

    function land(now) {
      cam.rest = true
      cam.home = cam.from = cam.dest
      cam.landed = now
      cam.rush = 0
      sc.pos = sc.goal = sc.own = window.scrollY
      sc.vel = 0
      sc.edge = now
      sc.push = sc.back = 0
      if (cam.dest !== scenes[0]) {
        cam.sweep ^= 1 // a scan line runs down the glass
        stage.dataset.land = String(cam.sweep)
      }
    }

    // The wheel and the scroll keys. Inside a section they move the page, up to its end; a
    // stride that reaches the end stops there, and the next one asks for the next section.
    // Mid-flight they only hurry the camera along, or, the other way, send it back.
    function feed(dy, key) {
      const now = performance.now()
      const sign = dy > 0 ? 1 : -1
      lastScroll = now
      if (!cam.rest) {
        const way = Math.sign(scenes.indexOf(cam.dest) - scenes.indexOf(cam.from))
        if (sign === way || !way) {
          cam.rush = Math.min(1, cam.rush + Math.abs(dy) / 700)
          sc.back = 0
          return
        }
        sc.back += Math.abs(dy)
        if (key || sc.back >= 120) go(cam.from, way > 0 ? "bottom" : "top")
        return
      }
      const scene = cam.home
      const edge = sign > 0 ? scene.hi : scene.lo
      if ((edge - sc.goal) * sign > 0.5) {
        const to = clamp(sc.goal + dy, scene.lo, scene.hi)
        // A trackpad sends a stream of small moves that is already smooth: the page tracks
        // it directly. A wheel notch is one big move, and the spring spreads it out.
        if (!key && Math.abs(dy) < 30) sc.pos += to - sc.goal
        sc.goal = to
        sc.push = 0
        if (sc.goal === edge) sc.edge = now
        return
      }
      const next = scenes[scenes.indexOf(scene) + sign]
      if (!next || now - cam.landed < LAND_COOL || now - sc.edge < EDGE_HOLD) return
      if (sign !== sc.pushDir || now - sc.pushAt > 500) sc.push = 0
      sc.pushDir = sign
      sc.pushAt = now
      sc.push += Math.abs(dy)
      if (key || sc.push >= PUSH) go(next, sign > 0 ? "top" : "bottom")
    }

    // Something inside the page that scrolls on its own keeps its wheel.
    function nested(el, dy) {
      for (let node = el; node && node !== document.body && node !== root; node = node.parentElement) {
        if (node.scrollHeight - node.clientHeight < 2) continue
        const flow = getComputedStyle(node).overflowY
        if (flow !== "auto" && flow !== "scroll") continue
        if (dy > 0 ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 0) return true
      }
      return false
    }

    function onWheel(event) {
      if (!cam.fly || event.ctrlKey || event.defaultPrevented) return
      const dy = event.deltaY * (event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? stage.clientHeight * 0.9 : 1)
      if (!dy || Math.abs(event.deltaX) > Math.abs(dy)) return
      if (event.target instanceof Element && nested(event.target, dy)) return
      event.preventDefault()
      if (!qs("dialog[open]")) feed(dy, false)
    }

    function onKey(event) {
      if (!cam.fly || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return
      const el = event.target instanceof Element ? event.target : null
      if ((el && el.closest("input,textarea,select,[contenteditable],dialog")) || qs("dialog[open]")) return
      const page = 0.86 * stage.clientHeight
      let dy = 0
      if (event.key === "ArrowDown") dy = 90
      else if (event.key === "ArrowUp") dy = -90
      else if (event.key === "PageDown") dy = page
      else if (event.key === "PageUp") dy = -page
      else if (event.key === " ") {
        if (el && el.closest("button,a,summary,[role=button]")) return
        dy = event.shiftKey ? -page : page
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault()
        if (event.key === "Home") go(scenes[0], "top")
        else go(scenes[scenes.length - 1], "bottom")
        return
      } else return
      event.preventDefault()
      feed(dy, true)
    }

    // A scroll the camera did not make: the scrollbar, find in page, focus moving on. Inside
    // the section on the glass it is the reader's to make. Anywhere else it is a request to
    // go there, and the page stays put until the camera has come out.
    function foreign(y) {
      if (!cam.aligned && !touched) return enter(sceneAtY(y)) // the browser placing the page as it opens
      const held = cam.held
      const within = y >= held.lo - 1 && y <= held.hi + 1
      if (within && (cam.rest || held === cam.dest)) {
        sc.pos = sc.goal = sc.own = y
        sc.vel = 0
        return
      }
      const at = within ? held : sceneAtY(y)
      if (at === held) {
        if (cam.rest) {
          sc.pos = sc.goal = clamp(y, held.lo, held.hi)
          sc.vel = 0
        }
      } else if (at !== cam.dest) go(at, y)
      else cam.entry = y
      scrollNow(sc.pos)
    }

    function camTick(now) {
      if (!cam.on) {
        cam.running = false
        return
      }
      window.requestAnimationFrame(camTick)
      if (document.hidden) return
      syncFly()
      if (now - cam.lay > 400) layout(now)
      // Frames can be far apart (a slow device, a throttled tab): the camera then takes the
      // bigger step, so the flight still lasts as long as it should.
      const dt = clamp((now - cam.at) / 1000, 0, 0.25)
      cam.at = now
      if (!cam.fly) return paintFlat(window.scrollY)
      if (!cam.aligned && document.readyState === "complete") {
        // The page has settled (fonts, images, a link to a section): start from where it is.
        cam.aligned = true
        if (!touched) {
          layout(now)
          enter(sceneAtY(window.scrollY))
        }
      }
      const intro = scenes[0]
      const want = cam.dest === intro ? null : cam.dest
      // The stills just switch sides, and only while the camera is out in the room.
      if (!live && cam.c < 0.01 && station !== target) setStation(target)
      const there = !moving && station === cam.dest.station

      // What is on the glass changes only with the camera out in the room, and the page moves
      // to the new section in the same breath, where it cannot be seen to jump.
      if (cam.p <= 0) {
        if (cam.shown && cam.shown !== want) show(null)
        if (!cam.shown) {
          if (!want) {
            if (cam.held !== intro) hold(intro)
          } else if (there && cam.hero <= 0.01) {
            show(want)
            hold(want)
            cam.lock = now
          }
        }
      }
      const goal = want && cam.shown === want ? 1 : 0
      // Heading out of a screen toward the other monitor: he comes back to rest meanwhile.
      cam.leaving = cam.p > 0 && goal === 0 && cam.dest.station !== station
      cam.rush *= Math.exp(-dt / 1.4)
      // The speed eases too, so turning back mid-flight is a swing, not a bounce.
      const dir = Math.sign(goal - cam.p)
      const pace = (dir * (1 + RUSH_GAIN * cam.rush)) / (dir > 0 ? DIVE_IN : DIVE_OUT)
      cam.v += (pace - cam.v) * (1 - Math.exp(-dt / 0.07))
      const before = cam.c
      cam.p = clamp(cam.p + cam.v * dt, 0, 1)
      if (cam.p === goal) cam.v = 0
      cam.c = cam.p < 0.5 ? 4 * cam.p * cam.p * cam.p : 1 - Math.pow(-2 * cam.p + 2, 3) / 2
      if ((before < 0.8) !== (cam.c < 0.8)) {
        cam.ring = now // through the glass
        cam.ringDir = cam.c > before ? 1 : -1
      }
      // The intro is out in the room: it clears before the camera sets off, and comes back
      // once he is at his first monitor again.
      const back = !want && !cam.shown && cam.p <= 0 && there
      cam.hero = clamp(cam.hero + (back ? dt / 0.45 : -dt / 0.26), 0, 1)

      const arrived = want ? cam.shown === want && cam.p >= 1 : back && cam.held === intro
      if (arrived && !cam.rest) land(now)

      // The page follows the wheel like a damped spring: it sets off gently, never
      // overshoots, and a long stride lands as softly as a short one.
      const gap = sc.pos - sc.goal
      if (gap || sc.vel) {
        const e = Math.exp(-SPRING * dt)
        const push = sc.vel + SPRING * gap
        sc.pos = sc.goal + (gap + push * dt) * e
        sc.vel = (sc.vel - push * SPRING * dt) * e
        if (Math.abs(sc.pos - sc.goal) < 0.3 && Math.abs(sc.vel) < 4) {
          sc.pos = sc.goal
          sc.vel = 0
        }
      }
      if (sc.pos !== sc.set) scrollNow(sc.pos)
      paint(now, window.scrollY)
      drawFx(now, dt, dt > 0 ? (cam.c - before) / dt : 0)
      chrome(dt)
      hud()
    }

    function paint(now, y) {
      const c = cam.c
      const scene = cam.shown
      const inside = cam.p >= 1 && !!scene
      if (inside && cam.inside === scene) return // nothing moves while the reader is inside
      cam.inside = inside ? scene : null
      root.classList.toggle("cam-inside", inside)

      const w = stage.clientWidth
      const h = stage.clientHeight
      // Where the clip frame's pixels land in the window (object-fit: cover, centred).
      const k = Math.max(w / SRC[0], h / SRC[1])
      const ox = (w - SRC[0] * k) / 2
      const oy = (h - SRC[1] * k) / 2
      const screen = SCREENS[station]
      const eased = screen.settle ? settled() : 0
      const rest = screen.quad.map(([x, yy], i) => [
        ox + (x + (eased ? screen.settle[i][0] * eased : 0)) * k,
        oy + (yy + (eased ? screen.settle[i][1] * eased : 0)) * k,
      ])
      // The slow drift that keeps held frames alive, out in the room.
      const u = (1 - Math.cos(now / 3500)) / 2
      const ds = 1 + 0.012 * u
      const px = 0.32 * w
      const py = 0.52 * h
      const room = rest.map(([x, yy]) => [px + (x - px) * ds, py + (yy - py) * ds - 0.003 * h * u])
      // The glass at full size: the monitor's shape, covering the window.
      const cw = Math.max(w, h * ASPECT)
      const ch = cw / ASPECT
      const cx = (w - cw) / 2
      const cy = (h - ch) / 2
      const full = [[cx, cy], [cx + cw, cy], [cx + cw, cy + ch], [cx, cy + ch]]
      // First a straight push toward the monitor, with the picture kept in proportion, so
      // nothing in the room is stretched while it is still in view; then, once the monitor
      // is most of the picture, the camera squares up to the glass.
      let area = 0
      let mx = 0
      let my = 0
      room.forEach(([x, yy], i) => {
        const [nx, ny] = room[(i + 1) % 4]
        area += x * ny - nx * yy
        mx += x / 4
        my += yy / 4
      })
      const fit = Math.sqrt((cw * ch) / Math.abs(area / 2))
      const zoom = Math.pow(fit, smooth(c / 0.9))
      const along = fit > 1.001 ? (zoom - 1) / (fit - 1) : 1
      const qx = lerp(mx, w / 2, along)
      const qy = lerp(my, h / 2, along)
      const square = smooth((c - 0.28) / 0.72)
      const quad = room.map(([x, yy], i) => [lerp(qx + (x - mx) * zoom, full[i][0], square), lerp(qy + (yy - my) * zoom, full[i][1], square)])
      const onto = fromSquare(quad)
      cam.quad = quad
      cam.vp = [(quad[0][0] + quad[1][0] + quad[2][0] + quad[3][0]) / 4, (quad[0][1] + quad[1][1] + quad[2][1] + quad[3][1]) / 4]

      put("frame", frameEl, "transform", toCss(mul(onto, adj(fromSquare(rest)))))
      putVar("--dive", c.toFixed(3))
      // The screen switches from his editor to the page as the camera sets off: quickly, like
      // a change of window, so the two are never read on top of each other.
      const glass = smooth(c / GLASS)
      putVar("--glass", glass.toFixed(3))
      putVar("--bezel", `${(cw * BEZEL).toFixed(1)}px`)
      const pane = mul(onto, [1 / cw, 0, 0, 0, 1 / ch, 0, 0, 0, 1])
      put("w", screenEl, "width", `${cw.toFixed(1)}px`)
      put("h", screenEl, "height", `${ch.toFixed(1)}px`)
      put("pane", screenEl, "transform", toCss(pane))
      put("hero", scenes[0].section, "opacity", cam.hero >= 0.999 ? "" : cam.hero.toFixed(3))
      if (!scene) return

      const el = scene.section
      if (inside) {
        put("s:transform", el, "transform", "")
        put("s:clip", el, "clipPath", "")
        put("s:will", el, "willChange", "")
        put("s:opacity", el, "opacity", "1")
        el.classList.add("is-inside")
        return
      }
      el.classList.remove("is-inside")
      // Drawn as the page shows it at this scroll position, then put on the glass. The page
      // does not scroll while the camera flies, so only the map changes from frame to frame.
      const view = clamp(y, scene.lo, scene.hi) - scene.top
      const ex = el.offsetLeft
      put("s:will", el, "willChange", "transform")
      put("s:transform", el, "transform", toCss(mul(shift(-ex, y - scene.top), mul(pane, shift(ex - cx, -view - cy)))))
      put("s:clip", el, "clipPath", `inset(${(view + cy).toFixed(1)}px 0 ${(scene.height - view - cy - ch).toFixed(1)}px 0)`)
      put("s:opacity", el, "opacity", glass.toFixed(3))
    }

    // What the flight looks like on top of the footage: brackets that lock onto the monitor
    // he is at, light streaking past as the camera moves, and a ripple as it goes through the
    // glass. Drawn only while something is moving.
    function drawFx(now, dt, rate) {
      if (!fx) return
      const scene = cam.shown
      const speed = Math.min(1.2, Math.abs(rate) / 2.4)
      const aim = scene && scene === cam.dest && cam.c < 0.8 ? 1 - smooth((cam.c - 0.4) / 0.4) : 0
      const ring = (now - cam.ring) / 620
      if ((speed < 0.012 && aim < 0.01 && ring >= 1) || !cam.quad) {
        if (fxOn) {
          fx.setTransform(1, 0, 0, 1, 0, 0)
          fx.clearRect(0, 0, fxEl.width, fxEl.height)
          fxOn = false
        }
        return
      }
      fxOn = true
      const w = stage.clientWidth
      const h = stage.clientHeight
      const k = Math.min(window.devicePixelRatio || 1, 1.5)
      if (fxEl.width !== Math.round(w * k) || fxEl.height !== Math.round(h * k)) {
        fxEl.width = Math.round(w * k)
        fxEl.height = Math.round(h * k)
      }
      fx.setTransform(k, 0, 0, k, 0, 0)
      fx.clearRect(0, 0, w, h)
      const quad = cam.quad
      const [vx, vy] = cam.vp
      const trace = (pts) => {
        fx.moveTo(pts[0][0], pts[0][1])
        for (let i = 1; i < 4; i++) fx.lineTo(pts[i][0], pts[i][1])
        fx.closePath()
      }

      if (speed > 0.012) {
        // Streaks run out from the monitor on the way in, and back toward it on the way out.
        // They stay off the screen itself, so the page on it is never drawn over.
        const reach = Math.hypot(Math.max(vx, w - vx), Math.max(vy, h - vy))
        const way = rate > 0 ? 1 : -1
        fx.save()
        fx.beginPath()
        fx.rect(0, 0, w, h)
        trace(quad)
        fx.clip("evenodd")
        fx.globalCompositeOperation = "lighter"
        fx.lineCap = "round"
        streaks.forEach((s) => {
          s.r += way * speed * s.s * (0.2 + s.r * 1.5) * dt * 1.5
          if (s.r > 1.1) {
            s.r = 0.03 + Math.random() * 0.12
            s.a = Math.random() * Math.PI * 2
          } else if (s.r < 0.03) {
            s.r = 0.9 + Math.random() * 0.2
            s.a = Math.random() * Math.PI * 2
          }
          const cos = Math.cos(s.a)
          const sin = Math.sin(s.a)
          const r0 = s.r * reach
          const r1 = (s.r + s.l * speed * (0.25 + s.r)) * reach
          fx.globalAlpha = Math.min(1, speed * speed) * clamp(s.r * 2.4, 0, 1) * 0.7
          fx.strokeStyle = s.tint
          fx.lineWidth = s.w * (0.7 + s.r * 1.4)
          fx.beginPath()
          fx.moveTo(vx + cos * r0, vy + sin * r0)
          fx.lineTo(vx + cos * r1, vy + sin * r1)
          fx.stroke()
        })
        fx.restore()
      }

      if (ring < 1) {
        // Through the glass: a ring of light opens out from the screen (or closes back onto
        // it, coming out).
        const e = 1 - Math.pow(1 - ring, 3)
        const r = lerp(0.1, 1.08, cam.ringDir > 0 ? e : 1 - e) * Math.hypot(w, h) / 2
        const a = Math.sin(Math.PI * Math.min(1, ring * 1.15)) * 0.34
        fx.save()
        fx.globalCompositeOperation = "lighter"
        fx.strokeStyle = "rgb(140,222,255)"
        fx.globalAlpha = a * 0.3
        fx.lineWidth = 18
        fx.beginPath()
        fx.arc(vx, vy, r, 0, Math.PI * 2)
        fx.stroke()
        fx.globalAlpha = a
        fx.lineWidth = 1.5
        fx.beginPath()
        fx.arc(vx, vy, r, 0, Math.PI * 2)
        fx.stroke()
        fx.restore()
      }

      if (aim > 0.01) {
        // The lock: four brackets close in on the screen's corners, with what is on it.
        const t = clamp((now - cam.lock) / 420, 0, 1)
        const e = 1 - Math.pow(1 - t, 3)
        const spread = 1 + (1 - e) * 0.3
        const pts = quad.map(([x, yy]) => [vx + (x - vx) * spread, vy + (yy - vy) * spread])
        const tone = "rgb(94,234,212)"
        fx.save()
        fx.lineCap = "square"
        fx.strokeStyle = tone
        fx.globalAlpha = aim * e * 0.2
        fx.lineWidth = 1
        fx.beginPath()
        trace(pts)
        fx.stroke()
        fx.globalAlpha = aim * e
        fx.lineWidth = 1.75
        fx.beginPath()
        pts.forEach((p, i) => {
          ;[pts[(i + 1) % 4], pts[(i + 3) % 4]].forEach((q) => {
            const len = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1
            const f = Math.min(0.2, 40 / len)
            fx.moveTo(p[0], p[1])
            fx.lineTo(p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f)
          })
        })
        fx.stroke()
        // Its label sits on the room side of the monitor, level with the top corner.
        const left = vx > w / 2
        const corner = left ? pts[0] : pts[1]
        const tx = corner[0] + (left ? -16 : 16)
        const ty = corner[1] + 4
        fx.font = `500 10px ${mono}`
        if ("letterSpacing" in fx) fx.letterSpacing = "1.6px"
        fx.textAlign = left ? "right" : "left"
        fx.textBaseline = "top"
        fx.fillStyle = tone
        fx.fillText(`${t < 1 ? "ACQUIRING" : "LOCKED"} ▸ ${scene.label.toUpperCase()}`, tx, ty)
        fx.fillStyle = "rgba(214,226,243,.72)"
        fx.fillText(`MONITOR ${scene.station.toUpperCase()} · Z ${String(Math.round(cam.c * 100)).padStart(3, "0")}`, tx, ty + 16)
        fx.restore()
      }
    }

    function putHud(name, value) {
      if (cam.last[`h${name}`] === value) return
      cam.last[`h${name}`] = value
      hudEl.style.setProperty(name, value)
    }

    // The frame around the picture: film bars and a caption while the camera travels, the
    // marker for the section being read, and the cue at a section's end.
    function chrome(dt) {
      if (!hudEl) return
      const c = cam.c
      const bars = cam.rest ? 0 : 1 - smooth((c - 0.55) / 0.4)
      cam.bars += (bars - cam.bars) * (1 - Math.exp(-dt / 0.16))
      putHud("--bars", cam.bars < 0.003 ? "0" : cam.bars.toFixed(3))
      putHud("--in", smooth((c - 0.9) / 0.1).toFixed(3))
      let text = ""
      if (!cam.rest) {
        if (cam.shown) text = `${cam.shown === cam.dest ? "Entering" : "Leaving"} ▸ ${cam.shown.label}`
        else if (moving) text = `Switching to monitor ${cam.dest.station.toUpperCase()}`
        else text = cam.dest === scenes[0] ? "Back to the room" : `Target ▸ ${cam.dest.label}`
      }
      if (text && cam.last.caption !== text) {
        cam.last.caption = text
        if (captionEl) captionEl.textContent = text
      }
      const index = scenes.indexOf(cam.dest)
      if (cam.last.rail !== index) {
        cam.last.rail = index
        railItems.forEach((item, i) => item.classList.toggle("is-on", i === index))
      }
      const next = scenes[scenes.indexOf(cam.home) + 1]
      const edge = cam.rest && !!next && sc.goal >= cam.home.hi - 1 && sc.goal - sc.pos < 24
      if (edge && cam.last.next !== next) {
        cam.last.next = next
        if (nextEl) nextEl.textContent = next.label
      }
      if (cam.last.edge !== edge) {
        cam.last.edge = edge
        hudEl.dataset.edge = String(edge)
      }
      putVar("--tag", cam.rest && sc.pos <= cam.home.lo + 6 ? "1" : "0") // in flight the caption speaks
    }

    // No camera (motion off, or a touch screen): the glass simply comes up over the room as
    // the intro leaves, and the page scrolls as any page does.
    function paintFlat(y) {
      const w = stage.clientWidth
      const h = stage.clientHeight
      const cw = Math.max(w, h * ASPECT)
      const ch = cw / ASPECT
      const glass = scenes[1] ? clamp((y - (scenes[1].top - h)) / (0.6 * h), 0, 1) : 0
      put("frame", frameEl, "transform", "")
      putVar("--dive", glass.toFixed(3))
      putVar("--glass", glass.toFixed(3))
      putVar("--tag", y > 6 ? "0" : "1")
      putVar("--bezel", `${(cw * BEZEL).toFixed(1)}px`)
      put("w", screenEl, "width", `${cw.toFixed(1)}px`)
      put("h", screenEl, "height", `${ch.toFixed(1)}px`)
      put("pane", screenEl, "transform", `translate(${((w - cw) / 2).toFixed(1)}px,${((h - ch) / 2).toFixed(1)}px)`)
    }

    function camOff() {
      if (cam.shown) show(null)
      cam.c = cam.p = cam.v = 0
      cam.leaving = false
      cam.rest = true
      cam.hero = 1
      cam.bars = 0
      cam.inside = null
      cam.quad = null
      cam.dest = cam.from = cam.home = cam.held = scenes[0]
      cam.last = {}
      frameEl.style.transform = ""
      scenes[0].section.style.opacity = ""
      root.classList.remove("cam-inside")
      ;["--dive", "--glass", "--bezel", "--tag"].forEach((name) => stage.style.removeProperty(name))
      if (hudEl) {
        ;["--bars", "--in"].forEach((name) => hudEl.style.removeProperty(name))
        hudEl.dataset.edge = "false"
      }
      if (fx && fxOn) {
        fx.setTransform(1, 0, 0, 1, 0, 0)
        fx.clearRect(0, 0, fxEl.width, fxEl.height)
        fxOn = false
      }
    }

    // The camera flies only with motion on and a pointer that has a wheel. Switching it on
    // puts the reader inside the section they were reading, with no flight.
    function syncFly() {
      const fly = cam.on && motionOn() && finePointer.matches
      if (fly === cam.fly) return
      cam.fly = fly
      root.classList.toggle("desk-scenes", fly)
      geo = null
      camOff()
      if (!fly) return
      layout(performance.now())
      enter(sceneAtY(window.scrollY))
    }

    // The section markers at the right edge: one tick each, and a click goes there.
    if (railEl) {
      scenes.forEach((scene) => {
        const item = document.createElement("li")
        const button = document.createElement("button")
        button.type = "button"
        button.tabIndex = -1
        button.dataset.label = scene.label
        button.addEventListener("click", () => {
          const hash = `#${scene.section.id}`
          if (go(scene, "top") && location.hash !== hash) history.pushState(null, "", hash)
        })
        item.appendChild(button)
        railEl.appendChild(item)
        railItems.push(item)
      })
    }

    // Cover math for object-fit: cover, so the emblem lands on the same spot in the frame.
    function frame() {
      const wide = wideQuery.matches
      const focus = wide ? 50 : FOCUS[station]
      stage.style.setProperty("--frame-x", `${focus}%`)
      const w = stage.clientWidth
      const h = stage.clientHeight
      const scale = Math.max(w / 1280, h / 720)
      const ox = (w - 1280 * scale) * (focus / 100)
      const oy = (h - 720 * scale) / 2
      const [u, v] = EYELINE[station]
      holoY = oy + v * 720 * scale
      holoScale = (720 * scale) / 520
      holo.style.setProperty("--holo-x", `${(ox + u * 1280 * scale).toFixed(1)}px`)
      holo.style.setProperty("--holo-y", `${holoY.toFixed(1)}px`)
      holo.style.setProperty("--holo-s", holoScale.toFixed(3))
    }

    function setScene(scene) {
      if (cam.fly) return // the camera decides what is being read
      active = scene
      target = scene.station
      hudScene.textContent = scene.label
      Object.entries(emblems).forEach(([name, el]) => el.classList.toggle("is-on", name === scene.emblem))
      if (!live) setStation(target) // the stills just switch sides; live, the scroll steers him
      update()
    }

    // How much of each side the content covers decides the scrim. The emblem shows once he
    // has arrived, until the section's content scrolls up into his eyeline.
    function update() {
      const vh = window.innerHeight
      let left = 0
      let right = 0
      if (wideQuery.matches) {
        // With the camera, only the intro sits out in the room, over the footage.
        ;(cam.on ? scenes.slice(0, 1) : scenes).forEach((scene) => {
          if (!scene.body) return
          const top = scene.body.getBoundingClientRect().top
          const bottom = scene.section.getBoundingClientRect().bottom
          const cover = clamp((Math.min(bottom, vh) - Math.max(top, 0)) / (vh * 0.6), 0, 1) * (scene.section.id === "hero" ? 0.55 : 1)
          if (scene.station === "a") right = Math.max(right, cover)
          else left = Math.max(left, cover)
        })
      } else {
        left = clamp(0.5 + window.scrollY / vh, 0, 1)
      }
      stage.style.setProperty("--cover-l", left.toFixed(3))
      stage.style.setProperty("--cover-r", right.toFixed(3))
      let eyeline = 0
      if (wideQuery.matches && !cam.on && !moving && active.emblem && active.station === station && active.body) {
        eyeline = clamp((active.body.getBoundingClientRect().top - (holoY + 30 * holoScale)) / (vh * 0.14), 0, 1)
      }
      stage.style.setProperty("--holo-on", eyeline.toFixed(3))
      hud()
    }

    function hud() {
      const text = !live ? STATES.paused : cam.c > 0.5 ? STATES.inside : moving ? STATES.moving : isSip(current) ? STATES.sip : CLIPS[station].label
      if (hudState.textContent !== text) hudState.textContent = text
      // Inside a screen the section names itself: the overlay says which monitor this is.
      const scene = cam.fly && cam.c > 0.5 ? `Monitor ${station.toUpperCase()}` : active.label
      if (hudScene.textContent !== scene) hudScene.textContent = scene
    }

    function setMotion(on) {
      syncFly()
      if (!on) return stopLive()
      if (!started) return load()
      if (!live) goLive()
    }

    function onWide() {
      const wide = wideQuery.matches
      root.classList.toggle("desk-wide", wide)
      root.classList.toggle("desk-dive", wide)
      if (cam.on !== wide) {
        cam.on = wide
        assign()
        geo = null
        cam.lay = 0
        syncFly()
        if (wide && !cam.running) {
          cam.running = true
          cam.at = performance.now()
          window.requestAnimationFrame(camTick)
        }
      }
      frame()
      update()
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const scene = entry.isIntersecting && scenes.find((item) => item.section === entry.target)
          if (scene) setScene(scene)
        })
      }, { rootMargin: "-30% 0px -69% 0px" })
      scenes.forEach((scene) => observer.observe(scene.section))
    }
    if (wideQuery.addEventListener) wideQuery.addEventListener("change", onWide)
    window.addEventListener("resize", () => {
      geo = null
      cam.lay = 0
      cam.inside = null
      frame()
    })
    window.addEventListener("scroll", () => {
      const now = performance.now()
      const dt = Math.min(100, Math.max(8, now - lastScroll)) / 1000
      const speed = Math.abs(window.scrollY - lastY) / (window.innerHeight || 1) / dt
      pace = Math.min(4, pace * Math.exp(-(now - lastScroll) / 300) * 0.7 + speed * 0.3)
      if (window.scrollY !== lastY) scrollDir = window.scrollY > lastY ? 1 : -1
      lastY = window.scrollY
      lastScroll = now
      if (cam.fly && Math.abs(window.scrollY - sc.own) > 1.5) foreign(window.scrollY)
    }, { passive: true })
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKey)
    // Focus moving into another section (the Tab key) takes the camera there.
    document.addEventListener("focusin", (event) => {
      if (!cam.fly || !(event.target instanceof Element)) return
      const scene = scenes.find((item) => item.section.contains(event.target))
      if (scene && scene !== cam.dest) go(scene, pageTop(event.target) - 0.35 * stage.clientHeight)
    })
    if (finePointer.addEventListener) finePointer.addEventListener("change", syncFly)
    // The page changing height (fonts, images, an opened detail) moves the sections.
    if ("ResizeObserver" in window) new ResizeObserver(() => { cam.lay = 0 }).observe(qs("main") || document.body)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) Object.values(vids).forEach((v) => v.pause())
      else if (live && vids[current]) vids[current].play().catch(() => stopLive())
      else if (started && motionOn()) goLive()
    })
    // Clips load after the page, so they never compete with the content.
    const begin = () => window.setTimeout(() => { if (motionOn()) load() }, 400)
    if (document.readyState === "complete") begin()
    else window.addEventListener("load", begin, { once: true })

    stage.dataset.live = "false"
    assign()
    onWide()
    return { setMotion, update, go: (section) => go(scenes.find((scene) => scene.section === section), "top"), owns: () => cam.fly }
  }

  const deskStage = qs("#desk-stage")
  if (deskStage) desk = initDesk(deskStage)

  // ---------------------- Motion: split headings into words ----------------------
  /**
   * Wraps each word in a clipping span so headings can rise into place word by
   * word. Nested markup such as the hero's accent span is preserved.
   */
  function splitWords(el) {
    let index = 0

    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child)
          return
        }
        if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) return

        const fragment = document.createDocumentFragment()
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(" "))
            return
          }
          const outer = document.createElement("span")
          const inner = document.createElement("span")
          outer.className = "w"
          inner.textContent = part
          inner.style.setProperty("--wi", index++)
          outer.appendChild(inner)
          fragment.appendChild(outer)
        })
        child.replaceWith(fragment)
      })
    }

    walk(el)
  }

  qsa("[data-split]").forEach(splitWords)

  // ---------------------- Motion: reveal on scroll ----------------------
  // Siblings that reveal together are staggered by their order in the parent.
  qsa("[data-reveal]").forEach((el) => {
    const siblings = Array.from(el.parentElement.children).filter((node) => node.hasAttribute("data-reveal"))
    el.style.setProperty("--d", Math.min(siblings.indexOf(el), 6) * 90)
  })

  const revealTargets = qsa("[data-reveal], [data-split], .timeline-item, .section-heading .eyebrow")

  function reveal(el) {
    el.classList.add("in")
    if (el.matches(".hero-stats > div, .hero-stats > div *")) runCounters(el)
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          reveal(entry.target)
          revealObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    revealTargets.forEach((el) => revealObserver.observe(el))
  } else {
    revealTargets.forEach(reveal)
  }

  // ---------------------- Motion: counters ----------------------
  const careerStart = 2013
  qsa("[data-count-years]").forEach((el) => {
    el.dataset.count = String(new Date().getFullYear() - careerStart)
    el.textContent = el.dataset.count
  })

  function runCounters(scope) {
    qsa("[data-count]", scope).forEach((el) => {
      const target = Number(el.dataset.count)
      if (!motionOn() || el.dataset.counted) {
        el.textContent = String(target)
        return
      }
      el.dataset.counted = "true"
      const start = performance.now()
      const duration = 1400
      const step = (now) => {
        const t = clamp((now - start) / duration, 0, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        el.textContent = String(Math.round(target * eased))
        if (t < 1) window.requestAnimationFrame(step)
      }
      el.textContent = "0"
      window.requestAnimationFrame(step)
    })
  }

  function settleCounters() {
    qsa("[data-count]").forEach((el) => {
      el.textContent = el.dataset.count
    })
  }

  // ---------------------- Motion: section accent ----------------------
  // The backdrop glow drifts to the accent of whichever section holds the middle of the screen.
  if ("IntersectionObserver" in window) {
    const accentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.dataset.accent) {
            document.body.dataset.accent = entry.target.dataset.accent
          }
        })
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    qsa("section[data-accent]").forEach((section) => accentObserver.observe(section))
  }

  // ---------------------- Motion: scroll-linked effects ----------------------
  const progressBar = qs(".scroll-progress")
  const hero = qs("#hero")
  const cases = Array.from(qsa(".case-stack .case"))
  const featureShot = qs(".feature-shot .case-shot-link")
  const timelineEl = qs("#experience-timeline")
  const timelineItems = Array.from(qsa("#experience-timeline .timeline-item"))
  const stackQuery = window.matchMedia("(min-width: 761px)")
  let scrollQueued = false

  function updateScrollEffects() {
    scrollQueued = false
    const vh = window.innerHeight
    const maxScroll = document.documentElement.scrollHeight - vh
    const animate = motionOn()

    if (progressBar) progressBar.style.setProperty("--progress", maxScroll > 0 ? (window.scrollY / maxScroll).toFixed(4) : 0)

    if (hero) hero.style.setProperty("--hero-p", animate ? clamp(window.scrollY / hero.offsetHeight, 0, 1).toFixed(3) : 0)

    // Stacked case studies: as the next card slides over, the one beneath settles back.
    const stacking = animate && stackQuery.matches
    cases.forEach((card, index) => {
      const next = cases[index + 1]
      if (!stacking || !next) {
        card.style.removeProperty("--stack-scale")
        card.style.removeProperty("--stack-dim")
        return
      }
      const stickTop = parseFloat(getComputedStyle(card).top) || 0
      const covered = clamp(1 - (next.getBoundingClientRect().top - stickTop) / card.offsetHeight, 0, 1)
      card.style.setProperty("--stack-scale", (1 - covered * 0.06).toFixed(4))
      card.style.setProperty("--stack-dim", (1 - covered * 0.45).toFixed(4))
    })

    // The ROOC screenshot tilts back and flattens as it reaches the middle of the screen.
    if (featureShot) {
      if (animate) {
        const rect = featureShot.getBoundingClientRect()
        const offset = clamp((rect.top + rect.height / 2 - vh / 2) / (vh / 2), 0, 1)
        featureShot.style.setProperty("--tilt", `${(offset * 16).toFixed(2)}deg`)
      } else {
        featureShot.style.removeProperty("--tilt")
      }
    }

    // Career rail fills toward the reading line; each role lights when the charge reaches it.
    if (timelineEl && !timelineEl.hidden) {
      const rect = timelineEl.getBoundingClientRect()
      const fill = clamp((vh * 0.62 - rect.top) / rect.height, 0, 1)
      timelineEl.style.setProperty("--fill", animate ? fill.toFixed(4) : 1)
      timelineItems.forEach((item) => {
        const reached = item.getBoundingClientRect().top - rect.top <= fill * rect.height + 8
        item.classList.toggle("lit", !animate || reached)
      })
    }

    if (desk) desk.update()
  }

  function requestScrollUpdate() {
    if (scrollQueued) return
    scrollQueued = true
    window.requestAnimationFrame(updateScrollEffects)
  }

  window.addEventListener("scroll", requestScrollUpdate, { passive: true })
  window.addEventListener("resize", requestScrollUpdate)
  if (viewTimelineBtn) viewTimelineBtn.addEventListener("click", requestScrollUpdate)
  updateScrollEffects()

  // ---------------------- Motion: marquee rows ----------------------
  // Each row is doubled so the loop is seamless; the copy is hidden from assistive tech.
  qsa(".marquee-track").forEach((track) => {
    const list = qs(".marquee-list", track)
    if (!list) return
    // A short row is padded with repeats until it spans the track, or the loop shows a gap.
    // Measured item by item so it also works while the row is wrapped with motion off.
    const originals = Array.from(list.children)
    const rowWidth = originals.reduce((sum, item) => sum + item.offsetWidth + 12, 0)
    const needed = Math.max(window.innerWidth, window.screen.width || 0)
    for (let width = rowWidth; rowWidth > 0 && width < needed; width += rowWidth) {
      originals.forEach((item) => {
        const repeat = item.cloneNode(true)
        repeat.setAttribute("aria-hidden", "true")
        list.appendChild(repeat)
      })
    }
    const clone = list.cloneNode(true)
    clone.setAttribute("aria-hidden", "true")
    track.appendChild(clone)
    // Constant speed regardless of row length: about 40px per second.
    track.style.setProperty("--marquee-duration", `${Math.max(20, Math.round(list.scrollWidth / 40))}s`)
  })

  // ---------------------- Motion: pointer effects ----------------------
  // Card spotlight follows the cursor.
  qsa("[data-spotlight]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`)
      card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`)
    })
  })

  // Primary calls to action lean gently toward the cursor.
  qsa("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      if (!motionOn() || !finePointer.matches) return
      const rect = el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.3).toFixed(1)}px)`
    })
    el.addEventListener("pointerleave", () => {
      el.style.transform = ""
    })
  })

  // ---------------------- Contact: copy email ----------------------
  const copyBtn = qs("#copy-email")
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const original = "Copy email"
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy)
        copyBtn.textContent = "Copied ✓"
        copyBtn.classList.add("copied")
      } catch (error) {
        copyBtn.textContent = "Select the address above"
      }
      window.setTimeout(() => {
        copyBtn.textContent = original
        copyBtn.classList.remove("copied")
      }, 2200)
    })
  }

  applyMotion(motionOn(), false)
})()
