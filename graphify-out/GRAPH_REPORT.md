# Graph Report - .  (2026-04-21)

## Corpus Check
- Large corpus: 297 files · ~259,545 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 437 nodes · 1219 edges · 31 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 95 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Mindwise Packaging & Visual Identity Pipeline|Mindwise Packaging & Visual Identity Pipeline]]
- [[_COMMUNITY_CDRI-08 Clinical Science & Evidence Base|CDRI-08 Clinical Science & Evidence Base]]
- [[_COMMUNITY_RaceSims Bot Codebase (WhatsAppInstagram)|RaceSims Bot Codebase (WhatsApp/Instagram)]]
- [[_COMMUNITY_Mindwise Brand Strategy & Sorted Agency|Mindwise Brand Strategy & Sorted Agency]]
- [[_COMMUNITY_RaceSims Operations & Hardware Supply Chain|RaceSims Operations & Hardware Supply Chain]]
- [[_COMMUNITY_The Edit — Prenatal Brand & Regulatory|The Edit — Prenatal Brand & Regulatory]]
- [[_COMMUNITY_RaceSims Digital Strategy (SEOGEODiscord)|RaceSims Digital Strategy (SEO/GEO/Discord)]]
- [[_COMMUNITY_RaceSims Product Catalog & B2B|RaceSims Product Catalog & B2B]]
- [[_COMMUNITY_ARKA Motorsports & CSK Partnership|ARKA Motorsports & CSK Partnership]]
- [[_COMMUNITY_RaceSims Social Media Channels|RaceSims Social Media Channels]]
- [[_COMMUNITY_ARKA Engineering Tools & Rally|ARKA Engineering Tools & Rally]]
- [[_COMMUNITY_RaceSims AI Bot Infrastructure|RaceSims AI Bot Infrastructure]]
- [[_COMMUNITY_Sim Racing Hardware Brands & Dealers|Sim Racing Hardware Brands & Dealers]]
- [[_COMMUNITY_RaceSims Website & SEO Content|RaceSims Website & SEO Content]]
- [[_COMMUNITY_Mindwise Campaign Concepts|Mindwise Campaign Concepts]]
- [[_COMMUNITY_FSSAI Regulatory & Wiki Lint|FSSAI Regulatory & Wiki Lint]]
- [[_COMMUNITY_The Edit Investor Materials|The Edit Investor Materials]]
- [[_COMMUNITY_Wiki Infrastructure|Wiki Infrastructure]]
- [[_COMMUNITY_Simulator Rental & B2B Projects|Simulator Rental & B2B Projects]]
- [[_COMMUNITY_Wiki IngestSchema System|Wiki Ingest/Schema System]]
- [[_COMMUNITY_Sorted Agency WhatsApp Communications|Sorted Agency WhatsApp Communications]]
- [[_COMMUNITY_RaceSims Catalogs|RaceSims Catalogs]]
- [[_COMMUNITY_Reddit Marketing|Reddit Marketing]]
- [[_COMMUNITY_Mindwise Packaging v0 (Mind Wise)|Mindwise Packaging v0 (Mind Wise)]]
- [[_COMMUNITY_Mindwise Packaging v1.3|Mindwise Packaging v1.3]]
- [[_COMMUNITY_Mindwise Packaging v1.0|Mindwise Packaging v1.0]]
- [[_COMMUNITY_Mindwise Packaging v1.1|Mindwise Packaging v1.1]]
- [[_COMMUNITY_Product Photography|Product Photography]]
- [[_COMMUNITY_Four Cohorts Targeting|Four Cohorts Targeting]]
- [[_COMMUNITY_Bot.js Entry Point|Bot.js Entry Point]]
- [[_COMMUNITY_ARKA Wiring Seed Data|ARKA Wiring Seed Data]]

## God Nodes (most connected - your core abstractions)
1. `Thambu - Founder/CEO` - 78 edges
2. `RaceSims - Sim Racing Hardware` - 70 edges
3. `Mindwise - Cognitive Wellness Supplement` - 65 edges
4. `CDRI-08 Standardized Bacopa Extract` - 61 edges
5. `Sorted Agency - Brand Strategy Partner` - 39 edges
6. `Lumen Marketing Company` - 33 edges
7. `Virtual Racing Hub / VRH (Competitor/Controlled Reseller)` - 30 edges
8. `Shivendra Selvam` - 29 edges
9. `Your Unfair Advantage - Brand Tagline` - 28 edges
10. `Manik - Sorted Design/Brand Lead` - 27 edges
11. `Binita - Sorted Packaging/Design` - 25 edges
12. `Patco Pharmaceuticals Pvt Ltd (Navi Mumbai, Packaging Vendor)` - 25 edges
13. `Semi-Transparent Bottle Design Concept` - 24 edges
14. `Conspit (Primary Supplier, China/Vietnam)` - 23 edges
15. `Race Engineer USP / Positioning` - 23 edges

## Surprising Connections (you probably didn't know these)
- `Qubic Systems` --different_product_category_than--> `Conspit (Primary Supplier, China/Vietnam)`  [INFERRED]
  wiki/entities/qubic-systems.md → racesims/Sales_Marketing_Catalog.md
- `Mindwise - Cognitive Wellness Supplement` --PLANNED_DISTRIBUTION_VIA--> `1mg E-Pharmacy Channel`  [INFERRED]
  CLAUDE.md → mindwise/Technical_Catalog.md
- `Mindwise - Cognitive Wellness Supplement` --community_strategy--> `Brain Hackers Network (Mindwise Community Concept)`  [EXTRACTED]
  CLAUDE.md → mindwise/marketing/meetings/05. MindWise Brand communication Strategy/_Mindwise - Brand Communication Strategy (EXT).txt
- `Mindwise - Cognitive Wellness Supplement` --influencer_target--> `Sid Warrier - Target Influencer`  [EXTRACTED]
  CLAUDE.md → mindwise/Meetings_Marketing_Catalog.md
- `Mindwise - Cognitive Wellness Supplement` --sister_brand_same_family--> `The Edit (Prenatal Wellness Brand by Aishu)`  [INFERRED]
  CLAUDE.md → prenatal/THE_EDIT_PROPOSAL_INDIA.md
- `Solusta Puducherry (manufacturer)` --potential_gummy_manufacturer_for--> `Mindwise - Cognitive Wellness Supplement`  [INFERRED]
  voice-briefs/2026-03-26-thambu-voice-brief.md → CLAUDE.md
- `RaceSims - Sim Racing Hardware` --authorized_distributor_for--> `Simagic (Distributor-Supplier, South India Territory)`  [EXTRACTED]
  CLAUDE.md → racesims/Partners_Catalog.md
- `INRC R1 Chennai 2026 Instagram Posts` --promotes--> `RaceSims - Sim Racing Hardware`  [EXTRACTED]
  racesims/social-media/inrc-r1-chennai-2026/instagram-posts.html → CLAUDE.md
- `INRacing` --competitor_of--> `RaceSims - Sim Racing Hardware`  [EXTRACTED]
  wiki/entities/inracing.md → CLAUDE.md
- `Shahid Moto Mind` --direction_rejected_by--> `Thambu - Founder/CEO`  [EXTRACTED]
  voice-briefs/2026-03-26-thambu-voice-brief.md → CLAUDE.md

## Hyperedges (group relationships)
- **Brand Strategy Lock (Jan 23, 2026)** — your_unfair_advantage, brand_communication_strategy, positioning_shift, placebo_wellness, four_target_audiences [EXTRACTED 1.00]
- **Sorted Agency Team Working on Mindwise** — aarti_samant, manik, tanya_leeds, binita, avantika, sorted_agency [EXTRACTED 1.00]
- **CDRI-08 Clinical Evidence Base** — cdri_08, stough_2001_trial, roodenrys_2002_trial, stough_2008_trial, csir_cdri [EXTRACTED 1.00]
- **Thambu's Three Business Ventures** — thambu, racesims, mindwise, lumen_marketing_company, the_edit [EXTRACTED 1.00]
- **Mindwise Brand Identity Development Pipeline** — sorted_agency, binita, manik, logo_route_3, patco_pharmaceuticals, your_unfair_advantage, placebo_wellness [EXTRACTED 0.95]
- **The Edit Product + Regulatory + Manufacturing Architecture** — the_edit, edit_for_two, edit_prenatal, quatrefolic, lifes_dha, albion_minerals, fssai_fsdu, tanishq_lifecare, brukem_life_care [EXTRACTED 0.95]
- **RaceSims Omnichannel Social Media Growth Strategy** — youtube_launch_kit, discord_setup_kit, twitter_launch_kit, facebook_fix_guide, instagram_content_calendar, social_links_hub, reddit_ama_post [INFERRED 0.90]
- **RaceSims SEO/GEO Content Pipeline** — seo_geo_audit, faq_page_content, blog_best_setup_india, geo_optimization, racesims_in_website [INFERRED 0.85]
- **RaceSims AI Bot Technology Stack** — racesims_ai_assistant, meta_cloud_api, anthropic_claude_api, tailscale_funnel, pm2_process_manager, whatsapp_bot_number, ai_assistant_dashboard [EXTRACTED 0.95]
- **ARKA-RaceSims Race Engineer Credibility Loop** — thambu, arka_motorsports, racesims, arka_engineering_tools_index, inrc_r1_chennai_instagram_posts, vw_polo_1l_tsi [INFERRED 0.90]
- **Thambu Multi-Business Travel Bundle** — thambu, arka_motorsports, racesims, mindwise, imcd, patco_pharmaceuticals, jay_kularia, shahid_moto_mind [EXTRACTED 0.90]
- **KeenMind Expiry Creates Mindwise Market Opportunity** — keenmind_agreement_expiry, sfi_health, csir_cdri, lumen_marketing_company, cdri_08, cdri_55_brand_name, mindwise [EXTRACTED 1.00]
- **Mindwise Packaging Design System** — blister_pack_specs, packaging_content_layout, csir_cdri_logo_requirement, tic_tac_seal_concept, semi_transparent_bottle, fssai_label_regulatory_text, scary_drug_problem, positioning_shift [INFERRED]
- **The Edit Brand Identity System** — prenatal_brand_name_the_edit, prenatal_brand_manifesto, prenatal_brand_manifesto_couples_equality, prenatal_dtc_lifestyle_strategy, prenatal_launch_roadmap, aishwarya_chandrasekaran, trimacare, ritual_benchmark [INFERRED]
- **RaceSims Competitive Moat Execution** — can_bus_telemetry, 90_day_execution_plan, racesims_bot, discord_server_setup_kit, virtual_racing_hub, race_engineer_positioning, brand_name_consistency_issue [INFERRED]
- **CDRI-08 Clinical Evidence Corpus** — stough_2001_12_week_trial, roodenrys_2002_retention_trial, calabrese_2008_elderly_trial, morgan_stevens_2010_elderly, stough_2008_90_day_trial, cdri_08_safety_profile, 55_percent_bacosides, cdri_08 [INFERRED 1.00]
- **RaceSims Competitive Execution Stack vs VRH** — discord_server_setup_kit, seo_content_gap, seo_technical_fixes, instagram_growth_tactics, blog_content_pipeline, race_engineer_positioning, csk_partnership_pitch, next_gen_racesims_rigs [INFERRED 0.90]
- **Mindwise Packaging-Launch Decision Nexus** — two_track_bottle_strategy, outer_cardboard_box_decision, monochrome_plus_green_pop, semi_transparent_bottle, launch_plan_june_1_2026, patco_pharmaceuticals, sorted_agency [INFERRED 0.90]
- **Mindwise Retention Flywheel** — 8_12_week_onset_claim, 60_capsule_bottle_decision, pricing_strategy, brain_health_community_vision [INFERRED 0.90]
- **RaceSims Competitive Moat (Content + Community + Engineering)** — race_engineer_positioning, blog_content_pipeline, discord_community_gap, can_bus_telemetry [INFERRED 0.85]
- **Mindwise Brand Positioning System** — your_unfair_advantage, age_paradox, positioning_shift, scary_drug_problem, four_cohorts [INFERRED 0.90]
- **RaceSims GEO+SEO Competitive Strategy** — geo_content_readiness, geo_first_mover_advantage, backlink_strategy, race_engineer_positioning, blog_content_pipeline, seo_technical_fixes, virtual_racing_hub, 90_day_execution_plan [INFERRED 0.90]
- **Mindwise Content & Campaign Architecture** — content_strategy_three_piece, hero_hub_hygiene_framework, four_cohorts, learning_is_childs_play_campaign, lead_the_room_campaign, your_unfair_advantage, marketing_budget_25l [EXTRACTED 0.95]
- **Thambu's Three-Business Portfolio** — thambu, mindwise_index, racesims_index, prenatal_index, aishwarya_chandrasekaran, lumen_marketing_company [EXTRACTED 1.00]
- **Bacopa Gummy Supply Chain** — indus_life_sciences, imcd, beta_free_bacopa_extract, solusta_puducherry, lumen_marketing_company [EXTRACTED 1.00]
- **RaceSims Premium Brand Portfolio** — moza, simagic_distributor, conspit, asetek, vnm, qubic_systems [INFERRED 0.85]
- **CDRI-08 Global Ownership Transition** — pier_campanini, andrea_zangara, keenmind, sfi_health, cdri_08, ctd_module_2, lumen_marketing_company [EXTRACTED 0.90]
- **CDRI-08 Science-to-Market Pipeline** — csir_cdri, cdri_08, dr_hemant_singh, adam_ritson, lumen_marketing_company, mindwise, thambu [EXTRACTED 1.00]
- **RaceSims Moat via ARKA Motorsports** — thambu, arka_motorsports, mr_leela_krishnan, abdul, racesims, conspit [EXTRACTED 1.00]
- **Thambu's Three-Business Portfolio** — thambu, racesims, mindwise, lumen_marketing_company, prenatal_brand, aishwarya_chandrasekaran, racesims_company [EXTRACTED 1.00]
- **Sorted Agency x Mindwise Brand Partnership** — sorted_agency, aarti_samant, manik, tanya_leeds, binita, shipra, mindwise, thambu, shivendra_selvam [INFERRED 1.00]
- **Bangalore Dealer + Installer Network** — sim_racing_hq, trayas, racing_rigs, lakshay, abdul, racesims [INFERRED 1.00]
- **ARKA Motorsports Credibility Pipeline** — mr_leela_krishnan, arka_motorsports, thambu, abdul, next_gen_racesims_rigs, racesims [INFERRED 1.00]
- **Mindwise Packaging Workflow** — patco_pharmaceuticals, binita, ankita_duseja, shivendra_selvam, thambu, sorted_agency [EXTRACTED 1.00]
- **CDRI-08 Clinical Evidence Chain** — cdri_08, ctd_references, stough_2001, stough_2008, roodenrys_2002, calabrese_2008, 55_percent_bacosides, eight_12_week_onset, cdri_08_safety_profile [EXTRACTED 1.00]
- **RaceSims Competitive Strategy Arc** — src_vrh_battle_plan, src_seo_geo_audit, virtual_racing_hub, race_engineer_positioning, seo_content_gap, geo_first_mover_advantage, blog_content_pipeline, moza [EXTRACTED 1.00]
- **5-Meeting Brand Strategy Arc (Jan-Feb 2026)** — meeting_1_brief_discussion, meeting_3_brand_strategy_workshop, meeting_4_brand_identity, meeting_5_content_strategy, meetings_1_to_5_hub, your_unfair_advantage, positioning_shift, semi_transparent_bottle, learning_is_childs_play, lead_the_room, content_strategy_three_piece, four_cohorts, scary_drug_problem [EXTRACTED 1.00]
- **June 1 Launch Countdown Coordination (Mar-Apr 2026)** — meeting_manik_pricing, launch_plan_june_1, meeting_summary_draft, mission_control_notion, thambu_voice_brief_mar26, thambu_travel_update, april_2_mumbai_meeting, sorted_whatsapp_packaging, critical_path_bottleneck, patco_pharmaceuticals, website_development, outer_cardboard_box_decision, dibiz_solution [EXTRACTED 0.95]
- **CTD Clinical Evidence to Marketing Claims Chain** — ctd_module_2_5, cdri_08, csir_cdri, fifty_five_percent_bacosides, eight_twelve_week_onset, stough_2001_trial, stough_2008_trial, roodenrys_2002_trial, barbhaiya_2008_trial, cdri_55_brand_name, your_unfair_advantage, placebo_wellness_enemy [EXTRACTED 0.95]
- **LMC-Indus Bacopa Partnership with SE Asia Exclusion** — lumen_marketing_company, indus_life_sciences, southeast_asia_exclusion, bacopa_combination_formulations [EXTRACTED 1.00]
- **CDRI-08 Nonclinical Safety Profile (with gaps and contradictions)** — cdri_08, ctd_module_2_4_nonclinical, spermatogenesis_contradiction, carcinogenicity_data_gap [EXTRACTED 1.00]
- **KeenMind Expiry → Mindwise Replacement for India** — keenmind, sfi_health, mindwise, cdri_08 [EXTRACTED 1.00]

## Communities

### Community 0 - "Mindwise Packaging & Visual Identity Pipeline"
Cohesion: 0.062
Nodes (96): 60-Capsule Bottle Decision, AceBlend Packaging Reference (Mar 20, 2026), AceBlend - Packaging Reference Brand, Ankita - Mindwise Team, Ankita Duseja, April 2 Mumbai In-Person Meeting, Avantika Bajoria, Avantika Bhandari (AB, Growth/Operations, Sorted) (+88 more)

### Community 1 - "CDRI-08 Clinical Science & Evidence Base"
Cohesion: 0.059
Nodes (75): 55%+ Bacosides Differentiator, 8-12 Week Onset Claim, Aavishkar Oral Strips, Adam Ritson (Key Brand Story Figure), Adam Ritson Recovery Story, Andrea Zangara, Bacopa Combination Formulations, Bacopa monnieri (+67 more)

### Community 2 - "RaceSims Bot Codebase (WhatsApp/Instagram)"
Cohesion: 0.108
Nodes (31): buildKnowledgeContext(), fmt(), generateResponse(), initAI(), addLeadEvent(), addMessage(), createEscalation(), findOrCreateContact() (+23 more)

### Community 3 - "Mindwise Brand Strategy & Sorted Agency"
Cohesion: 0.171
Nodes (34): Aarti Samant - Sorted Strategy Director, Age Paradox, Avantika - Sorted Growth Partner, Brain Hackers Network (Mindwise Community Concept), Brain Health Community Vision, Brain Health Community Vision, Brand Brief (Jan 2026), Brand Communication Strategy - What/How/Why Framework (+26 more)

### Community 4 - "RaceSims Operations & Hardware Supply Chain"
Cohesion: 0.085
Nodes (32): Abdul (field installer), Ajit Kumar Racing, Asetek SimSports, Asetek SimSports (Hardware Supplier), No.2 First Cross St, Ashok Nagar, Chennai 600083, Chennai, India, Devraj Computers (Gigabyte Dealer, Tamil Nadu), RaceSims Growth Command Center (+24 more)

### Community 5 - "The Edit — Prenatal Brand & Regulatory"
Cohesion: 0.178
Nodes (31): Aishu (Aishwarya Chandrasekaran), Aishwarya Chandrasekaran (Aishu), Albion Chelated Minerals (Branded Ingredient), Brukem Life Care (Contract Manufacturer, Ahmedabad), Edit For Two (Hero SKU - Couples Preconception Bundle), Edit Postnatal (Postpartum Recovery, Year 1 Expansion), Edit Prenatal (Comprehensive Prenatal Supplement), FSSAI FSDU (Foods for Special Dietary Use) Regulatory Pathway (+23 more)

### Community 6 - "RaceSims Digital Strategy (SEO/GEO/Discord)"
Cohesion: 0.25
Nodes (24): RaceSims 90-Day Execution Plan, Backlink Strategy, Blog Content Pipeline (10 Articles), Brand Name Consistency Issue (Race Sims vs RaceSims), CAN Bus Telemetry — Sim-to-Real R&D, Discord Community Gap, Discord Server Setup Kit, GEO Content Readiness (+16 more)

### Community 7 - "RaceSims Product Catalog & B2B"
Cohesion: 0.143
Nodes (21): Araya Airport/Global (B2B Client, Airport Simulators), Conspit (Primary Supplier, China/Vietnam), Conspit Ares Platinum, Conspit CPP EVO v2 Pedals, RaceSims Customer Pipeline, Facebook Page Fix Guide, Facebook Race.sims, GT Pro Rig (RaceSims Flagship) (+13 more)

### Community 8 - "ARKA Motorsports & CSK Partnership"
Cohesion: 0.175
Nodes (16): ARKA Motorsports (Client, Coimbatore, Est. 1987), ARKA Motorsports INRC Chennai Pit Banners Design, Chennai Super Kings (CSK), CSK Partnership Pitch Strategy, CSK Content Idea Pitch (Apr 8, 2026), INRC R1 Chennai 2026 Instagram Posts, Instagram Growth Tactics (537 to 10K+), Jamie Shaw Racing (Influencer) (+8 more)

### Community 9 - "RaceSims Social Media Channels"
Cohesion: 0.194
Nodes (9): APRC (FIA Asia Pacific Rally Championship), ARKA Engineering Tools Index, ECU Wiring Manager Tool, Gear Ratio Calculator Tool, INRC (Indian National Rally Championship), Karna Kadur (driver), MoTeC M142 ECU, OBR Control Systems / Harjee (+1 more)

### Community 10 - "ARKA Engineering Tools & Rally"
Cohesion: 0.222
Nodes (9): AI Assistant Dashboard UI, AI Assistant Operations Runbook, AI Assistant Setup Guide, Anthropic Claude API (Bot Brain), Meta Cloud API (WhatsApp Business), PM2 Process Manager, RaceSims AI Assistant (WhatsApp/Instagram Bot), Tailscale Funnel (Bot Infra) (+1 more)

### Community 11 - "RaceSims AI Bot Infrastructure"
Cohesion: 0.4
Nodes (6): RaceSims Discord Community, Discord Server Setup Kit, Indian Racing Community (IRC Discord), Social Links Hub, Twitter/X Launch Kit, X/Twitter @race_sims_india

### Community 12 - "Sim Racing Hardware Brands & Dealers"
Cohesion: 0.467
Nodes (6): Blog: Best Sim Racing Setup India 2026, FAQ Page Content (SEO-optimized), Generative Engine Optimization (GEO), Load Cell Pedals (Technology), racesims.in (Shopify), SEO & GEO Audit Report

### Community 13 - "RaceSims Website & SEO Content"
Cohesion: 0.467
Nodes (6): Fanatec, Moza Racing, Playseat, Simagic South India Distributor Contract, Simulator Rental Proposal, Techxhub (Retail Partner, Fanatec/Playseat)

### Community 14 - "Mindwise Campaign Concepts"
Cohesion: 0.5
Nodes (5): Campaign: When the Brain is Sharp, Learning Becomes a Child's Play, Campaign: Lead the Room (Professionals), Hero/Hub/Hygiene Content Framework, Instagram Creator Persona Strategy, Sid Warrier - Target Influencer

### Community 15 - "FSSAI Regulatory & Wiki Lint"
Cohesion: 0.5
Nodes (4): FSSAI Label Regulatory Text, Wiki Lint Report 2026-04-12, Wiki Lint Report 2026-04-14, Lint Cleanup Verification 2026-04-12

### Community 16 - "The Edit Investor Materials"
Cohesion: 0.667
Nodes (3): The Edit Gynaecologist Co-Founder Invite, The Edit Series Seed Pitch Deck, The Edit Proposal India

### Community 17 - "Wiki Infrastructure"
Cohesion: 0.667
Nodes (3): Wiki Hot Cache, Wiki Master Index, Wiki Operation Log

### Community 18 - "Simulator Rental & B2B Projects"
Cohesion: 0.667
Nodes (3): Mahindra Thar Roxx Simulator, Online Instruments India Pvt Ltd, Transport Spec Sheet - Online Instruments

### Community 19 - "Wiki Ingest/Schema System"
Cohesion: 0.667
Nodes (3): Ingest Workflow Guide, Obsidian Setup Guide, Wiki Schema & Page Conventions

### Community 20 - "Sorted Agency WhatsApp Communications"
Cohesion: 1.0
Nodes (2): Sorted x Mindwise Raw WhatsApp Chat Export, Sorted x Mindwise WhatsApp Chat Summary (Dec 2025 - Mar 2026)

### Community 21 - "RaceSims Catalogs"
Cohesion: 1.0
Nodes (2): RaceSims Partners Catalog, RaceSims Sales & Marketing Catalog

### Community 22 - "Reddit Marketing"
Cohesion: 1.0
Nodes (1): Mindwise Packaging Report (MIND WISE variant)

### Community 23 - "Mindwise Packaging v0 (Mind Wise)"
Cohesion: 1.0
Nodes (1): Mindwise Packaging Report v1.3

### Community 24 - "Mindwise Packaging v1.3"
Cohesion: 1.0
Nodes (1): Mindwise Packaging Report v1.0

### Community 25 - "Mindwise Packaging v1.0"
Cohesion: 1.0
Nodes (1): Mindwise Packaging Report v1.1 (Current)

### Community 26 - "Mindwise Packaging v1.1"
Cohesion: 1.0
Nodes (1): RaceSims Product Images (IMG_4951, IMG_4952)

### Community 27 - "Product Photography"
Cohesion: 1.0
Nodes (1): Four-Cohort Content Rollout

### Community 28 - "Four Cohorts Targeting"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Bot.js Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "ARKA Wiring Seed Data"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **101 isolated node(s):** `Patco Pharmaceuticals Pvt. Ltd.`, `Mindwise Launch Plan - June 1, 2026`, `Mindwise Capsule Product Specifications`, `CTD Regulatory Documents (Modules 2.4, 2.5, 2.7)`, `Four Target Audiences` (+96 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Sorted Agency WhatsApp Communications`** (2 nodes): `Sorted x Mindwise Raw WhatsApp Chat Export`, `Sorted x Mindwise WhatsApp Chat Summary (Dec 2025 - Mar 2026)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `RaceSims Catalogs`** (2 nodes): `RaceSims Partners Catalog`, `RaceSims Sales & Marketing Catalog`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Reddit Marketing`** (1 nodes): `Mindwise Packaging Report (MIND WISE variant)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mindwise Packaging v0 (Mind Wise)`** (1 nodes): `Mindwise Packaging Report v1.3`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mindwise Packaging v1.3`** (1 nodes): `Mindwise Packaging Report v1.0`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mindwise Packaging v1.0`** (1 nodes): `Mindwise Packaging Report v1.1 (Current)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mindwise Packaging v1.1`** (1 nodes): `RaceSims Product Images (IMG_4951, IMG_4952)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Product Photography`** (1 nodes): `Four-Cohort Content Rollout`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Four Cohorts Targeting`** (1 nodes): `bot.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bot.js Entry Point`** (1 nodes): `seed-polo.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ARKA Wiring Seed Data`** (1 nodes): `seed-profiles.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Thambu - Founder/CEO` connect `Mindwise Packaging & Visual Identity Pipeline` to `CDRI-08 Clinical Science & Evidence Base`, `Mindwise Brand Strategy & Sorted Agency`, `RaceSims Operations & Hardware Supply Chain`, `The Edit — Prenatal Brand & Regulatory`, `RaceSims Digital Strategy (SEO/GEO/Discord)`, `RaceSims Product Catalog & B2B`, `ARKA Motorsports & CSK Partnership`, `ARKA Engineering Tools & Rally`?**
  _High betweenness centrality (0.286) - this node is a cross-community bridge._
- **Why does `RaceSims - Sim Racing Hardware` connect `RaceSims Operations & Hardware Supply Chain` to `Mindwise Packaging & Visual Identity Pipeline`, `CDRI-08 Clinical Science & Evidence Base`, `The Edit — Prenatal Brand & Regulatory`, `RaceSims Digital Strategy (SEO/GEO/Discord)`, `RaceSims Product Catalog & B2B`, `ARKA Motorsports & CSK Partnership`, `ARKA Engineering Tools & Rally`, `RaceSims AI Bot Infrastructure`, `Sim Racing Hardware Brands & Dealers`, `RaceSims Website & SEO Content`, `Simulator Rental & B2B Projects`?**
  _High betweenness centrality (0.216) - this node is a cross-community bridge._
- **Why does `CDRI-08 Standardized Bacopa Extract` connect `CDRI-08 Clinical Science & Evidence Base` to `Mindwise Packaging & Visual Identity Pipeline`, `Mindwise Brand Strategy & Sorted Agency`, `The Edit — Prenatal Brand & Regulatory`, `FSSAI Regulatory & Wiki Lint`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Mindwise - Cognitive Wellness Supplement` (e.g. with `1mg E-Pharmacy Channel` and `The Edit (Prenatal Wellness Brand by Aishu)`) actually correct?**
  _`Mindwise - Cognitive Wellness Supplement` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `CDRI-08 Standardized Bacopa Extract` (e.g. with `Semi-Transparent Bottle Design Concept` and `Life Essence — Previous Brand Name`) actually correct?**
  _`CDRI-08 Standardized Bacopa Extract` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Sorted Agency - Brand Strategy Partner` (e.g. with `Avantika Bajoria` and `Dibiz Solution`) actually correct?**
  _`Sorted Agency - Brand Strategy Partner` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Patco Pharmaceuticals Pvt. Ltd.`, `Mindwise Launch Plan - June 1, 2026`, `Mindwise Capsule Product Specifications` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Mindwise Packaging & Visual Identity Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `CDRI-08 Clinical Science & Evidence Base` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `RaceSims Bot Codebase (WhatsApp/Instagram)` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._