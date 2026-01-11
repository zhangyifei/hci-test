Globle rule: Only steps can be done in the current step, should show enable and clickable, other operations should be disabled and unclickable. 

Scenario c1 — Low Heterogeneity × Low Interrelatedness

-- Intended user path (exact screens + CTAs)

home → tap Choose a service → service

service → tap Open Ride → taskA (Ride Step 1)

taskA Step 1 → select option → tap Continue → taskA Step 2

taskA Step 2 → tap Continue (marks Task A started) → remain on Step 2

taskA Step 2 → tap Switch service → switch

switch → tap Go to Package → taskB Step 1

taskB Step 1 → tap Continue → taskB Step 2

taskB Step 2 → tap Confirm → switch

switch → tap Go to Ride → resumeA

resumeA → tap Finish Task A → finish

finish → tap Return to Home → home



Scenario c2 — Low Heterogeneity × High Interrelatedness

---- Intended user path (exact screens + CTAs)

home → Choose a service → service

service → Open Ride → taskA Step 1

taskA Step 1 → select option → Continue → Step 2

taskA Step 2 → Continue (marks started) → stay Step 2

taskA Step 2 → Switch service → switch

switch → Go to Package → taskB Step 1

taskB Step 1 → Continue → Step 2

taskB Step 2 → Confirm → switch

switch → tap Resume on the Resume Task A card → resumeA

resumeA → Finish Task A → finish

finish → Return to Home → home


Scenario c3 — High Heterogeneity × Low Interrelatedness

--- Intended user path (exact screens + CTAs)

Same screen sequence as c1/c2, but Service 2 is Grocery and TaskB Step 1 differs:

home → Choose a service → service

service → Open Ride → taskA Step 1

taskA Step 1 → select option → Continue → Step 2

taskA Step 2 → Continue (marks started) → stay Step 2

taskA Step 2 → Switch service → switch

switch → Go to Grocery → taskB Step 1

taskB Step 1 → (compose action UI present) → Continue → Step 2

taskB Step 2 → Confirm → switch

switch → Go to Ride → resumeA

resumeA → Finish Task A → finish

finish → Return to Home → home


Scenario c4 — High Heterogeneity × High Interrelatedness

--- Intended user path (exact screens + CTAs)

Same as c2, with Grocery + compose TaskB:

home → Choose a service → service

service → Open Ride → taskA Step 1

taskA Step 1 → select option → Continue → Step 2

taskA Step 2 → Continue (marks started) → stay Step 2

taskA Step 2 → Switch service → switch

switch → Go to Grocery → taskB Step 1

taskB Step 1 (compose UI) → Continue → Step 2

taskB Step 2 → Confirm → switch

switch → Resume on Resume Task A card → resumeA

resumeA → Finish Task A → finish

finish → Return to Home → home
