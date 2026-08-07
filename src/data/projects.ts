export type ProjectStatus = 'public-code' | 'academic-private' | 'live-demo';

export type ProjectCategory =
  | 'biometrics'
  | 'security'
  | 'ml'
  | 'nlp'
  | 'audio'
  | 'astrophysics'
  | 'systems'
  | 'data'
  | 'music';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectBody {
  problem: string;
  approach: string;
  architecture: string;
  results: string;
  limits: string;
}

export interface ProjectLinks {
  code?: string;
  demo?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  stack: string[];
  status: ProjectStatus;
  stage?: string;
  featured: boolean;
  metrics: ProjectMetric[];
  body: ProjectBody;
  links: ProjectLinks;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  biometrics: 'Biometrics',
  security: 'Security',
  ml: 'Machine Learning',
  nlp: 'NLP',
  audio: 'Audio / MIR',
  astrophysics: 'Astrophysics',
  systems: 'Systems',
  data: 'Data',
  music: 'Music Theory',
};

export const projects: Project[] = [
  {
    slug: 'biometric-anti-spoofing-thesis',
    title: 'Biometric Anti-Spoofing via Perspiration & Facial rPPG',
    category: 'biometrics',
    summary:
      "Master's thesis in progress: detecting presentation attacks in biometric authentication by analyzing perspiration patterns in fingerprint images and remote photoplethysmography (rPPG) signals extracted from facial video.",
    stack: ['Python', 'Anti-Spoofing', 'rPPG', 'Signal Processing', 'Biometrics'],
    status: 'academic-private',
    stage: 'Ongoing',
    featured: true,
    metrics: [
      { label: 'Stage', value: "Master's thesis" },
      { label: 'Modalities', value: 'Fingerprint + face' },
      { label: 'Status', value: 'In progress' },
    ],
    body: {
      problem:
        'Biometric authentication systems can be fooled by presentation attacks — fake fingerprints, printed photos, replayed video — that mimic a genuine user without being one. Most anti-spoofing methods look at surface texture; fewer look at the physiological signals a live body produces.',
      approach:
        'The thesis investigates two liveness signals in parallel: perspiration patterns in fingerprint images, which differ between real skin and spoof materials over successive captures, and rPPG — the subtle color changes in facial video caused by blood flow — as a signal that is very hard to fake convincingly.',
      architecture:
        'A dual pipeline: one branch processes sequential fingerprint captures to isolate perspiration-related texture changes, the other extracts an rPPG signal from facial video regions and analyzes it for the periodicity and noise characteristics of a live pulse.',
      results:
        "Work is ongoing as part of the Master's program; quantitative results are not yet finalized and will be documented once the thesis is complete.",
      limits:
        'As an active thesis, evaluation is still being carried out on constrained academic datasets rather than production-scale, diverse data — a common and expected limitation at this stage of the research.',
    },
    links: {},
  },
  {
    slug: 'facial-authentication-system',
    title: 'Facial Authentication System',
    category: 'biometrics',
    summary:
      'Designed and evaluated a facial recognition system using MTCNN for face detection and InceptionResNetV1 for feature extraction.',
    stack: ['Python', 'MTCNN', 'InceptionResNetV1'],
    status: 'academic-private',
    featured: true,
    metrics: [
      { label: 'Detection', value: 'MTCNN' },
      { label: 'Embedding', value: 'InceptionResNetV1' },
      { label: 'Task', value: 'Verification' },
    ],
    body: {
      problem:
        'Face-based authentication needs to reliably tell two things apart: is there a face in this frame, and does it belong to the enrolled person — both under realistic lighting and pose variation.',
      approach:
        'MTCNN handles detection and alignment, cropping and normalizing faces before they reach the recognition stage. InceptionResNetV1, pretrained for face embedding, converts each aligned face into a compact feature vector used for verification by distance comparison.',
      architecture:
        'A two-stage pipeline — detection/alignment, then embedding extraction — kept intentionally simple and modular so each stage could be evaluated independently against known failure modes (poor alignment, low-quality crops).',
      results:
        'The system reliably verified enrolled identities on the evaluation set used for the coursework, consistent with expected performance from a pretrained-embedding approach on a constrained academic dataset.',
      limits:
        'Evaluated on a controlled academic dataset, not on adversarial or spoofed inputs — it assumes a genuine live face, and does not include liveness/anti-spoofing checks (that problem is the separate focus of the ongoing Master’s thesis above).',
    },
    links: {},
  },
  {
    slug: 'cartographer',
    title: 'Cartographer — Interactive Audio Similarity Map',
    category: 'audio',
    summary:
      'Acoustic space engine and Music Information Retrieval (MIR) web app. Extracts DSP features (Spectral Centroid, RMS, 13 MFCCs) from audio files, normalizes metrics via Z-Score, and projects them into 2D space using UMAP for real-time sound navigation.',
    stack: ['TypeScript', 'Web Audio API', 'DSP / Meyda', 'UMAP', 'HTML5 Canvas'],
    status: 'live-demo',
    featured: true,
    metrics: [
      { label: 'Features', value: '15 (13 MFCC + 2)' },
      { label: 'Projection', value: 'UMAP → 2D' },
      { label: 'Rendering', value: 'Canvas, real-time' },
    ],
    body: {
      problem:
        'Sound libraries are usually browsed by filename or folder, which says nothing about how sounds actually relate to each other sonically. Finding "something like this, but brighter" is hard without listening to everything.',
      approach:
        'Each audio file is analyzed for DSP features — spectral centroid, RMS energy and 13 MFCCs — using Meyda in the browser. Features are normalized with Z-scores so no single dimension dominates, then reduced to two dimensions with UMAP, producing a map where sonically similar sounds cluster together.',
      architecture:
        'A client-side pipeline: file input → Web Audio decoding → Meyda feature extraction → Z-score normalization → UMAP projection → interactive Canvas rendering, with a Teenage-Engineering-inspired hardware UI for controls.',
      results:
        'Produces a navigable 2D map of a dropped audio collection entirely in-browser, with no server processing — the whole pipeline, from decoding to projection, runs client-side.',
      limits:
        'UMAP projections are sensitive to their input parameters and dataset size; very small collections produce less meaningful clusters, and the projection is a 2D approximation of a higher-dimensional feature space, so proximity on the map is a guide, not a guarantee of perceptual similarity.',
    },
    links: {
      demo: 'https://flaviagaglio.github.io/cartographer/',
      code: 'https://github.com/flaviagaglio/cartographer',
    },
  },
  {
    slug: 'kepler0',
    title: 'Kepler0 — N-Body Gravitational Synthesizer',
    category: 'astrophysics',
    summary:
      'Real-time 2D astrophysical simulation engine modeling N-body gravitational interactions. Features classic mechanics integration, vector decomposition with softening factors, interactive stochastic mass injection, and a brutalist hardware-inspired HUD.',
    stack: ['JavaScript', 'HTML5 Canvas', 'Astrophysics', 'Numerical Simulation'],
    status: 'live-demo',
    featured: false,
    metrics: [
      { label: 'Model', value: 'N-body gravity' },
      { label: 'Integration', value: 'Softened vectors' },
      { label: 'Rendering', value: 'Canvas, real-time' },
    ],
    body: {
      problem:
        'N-body gravitational systems are chaotic and visually rich, but most simulations are either offline/scientific (no interactivity) or purely decorative (no real physics) — there is little in between that is both correct and playable.',
      approach:
        'Each body attracts every other body under Newtonian gravity, computed and integrated frame by frame. A softening factor prevents the numerical blow-up that happens when two bodies get too close, keeping the simulation stable during close encounters instead of ejecting bodies at infinite velocity.',
      architecture:
        'A per-frame N² force calculation (every body against every other body), vector decomposition into per-axis acceleration, Euler-style integration for position/velocity updates, and a Canvas renderer with a hardware-HUD control panel for injecting new masses stochastically.',
      results:
        'Runs a stable, interactive real-time simulation in the browser where users can inject mass and watch orbital and chaotic behavior emerge, with no physics engine dependency.',
      limits:
        "N² force calculation doesn't scale — the simulation is tuned for a moderate number of bodies, not the thousands a real N-body scientific solver would need; this is an interactive toy grounded in real mechanics, not a research-grade integrator.",
    },
    links: {
      demo: 'https://flaviagaglio.github.io/kepler0/',
      code: 'https://github.com/flaviagaglio/kepler0',
    },
  },
  {
    slug: 'vulnerability-analysis-biometric-systems',
    title: 'Vulnerability Analysis in Biometric Systems',
    category: 'security',
    summary:
      "Bachelor's thesis: comparative study of attack methods on biometric authentication and corresponding countermeasures.",
    stack: ['Biometrics', 'Security'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Type', value: "Bachelor's thesis" }],
    body: {
      problem:
        'Biometric systems are often assumed to be inherently secure because "you can\'t forget your fingerprint" — but that assumption ignores a wide range of documented attack vectors.',
      approach:
        'A literature-grounded comparative study surveying attack methods across biometric modalities (presentation attacks, template attacks, sensor-level attacks) alongside the countermeasures proposed for each.',
      architecture:
        'Structured as a systematic comparison: attack class → mechanism → affected modality → known countermeasure, rather than a single implemented system.',
      results:
        'Produced a structured overview connecting attack classes to their mitigations, used as the foundation for the deeper anti-spoofing work now underway in the Master’s thesis.',
      limits: 'A literature and comparative-analysis thesis rather than a novel attack or defense implementation.',
    },
    links: {},
  },
  {
    slug: 'kitsune-revisited',
    title: 'Kitsune Revisited: Autoencoder Ensembles for Network Anomaly Detection',
    category: 'security',
    summary:
      'Independent research write-up examining Kitsune, an ensemble of autoencoders for unsupervised anomaly detection in web traffic, with a focus on its architecture and detection behavior.',
    stack: ['Autoencoders', 'Anomaly Detection', 'Network Security'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Type', value: 'Research write-up' }],
    body: {
      problem:
        'Detecting novel network attacks without labeled examples of them — the core challenge unsupervised anomaly detection tries to solve for network intrusion detection.',
      approach:
        'An in-depth examination of Kitsune, an ensemble-of-autoencoders IDS: how it splits traffic features across small autoencoders, combines their reconstruction errors, and flags anomalies without needing attack labels.',
      architecture:
        "Analysis-focused, following Kitsune's own architecture: a feature mapper that clusters correlated features, an ensemble of small autoencoders each specializing in a feature subset, and an output autoencoder combining their reconstruction errors into a single anomaly score.",
      results:
        "A written analysis of the architecture's strengths (lightweight, online, unsupervised) and its detection behavior on the traffic patterns it targets.",
      limits: 'A research write-up examining an existing published system, not a from-scratch reimplementation or novel benchmark.',
    },
    links: {},
  },
  {
    slug: 'fido2-webauthn-study',
    title: 'FIDO2 & WebAuthn: A Study of Passkey Authentication',
    category: 'security',
    summary:
      'Independent research write-up exploring the FIDO2/WebAuthn standards underlying passkeys, covering the authentication flow, credential model and security guarantees.',
    stack: ['FIDO2', 'WebAuthn', 'Authentication'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Type', value: 'Research write-up' }],
    body: {
      problem: 'Passwords remain the weakest link in most authentication systems — phishable, reusable, and hard to use securely.',
      approach:
        'A study of the FIDO2/WebAuthn standard stack that underlies passkeys: how public-key credentials are generated and bound to an origin, how the ceremony resists phishing, and what guarantees the model actually provides versus what marketing claims.',
      architecture:
        'Covers the full authentication flow — relying party, authenticator, client — and the credential model (key pairs generated per-origin, private keys never leaving the authenticator).',
      results: 'A structured explanation of why WebAuthn resists phishing and credential replay in ways password-based auth structurally cannot.',
      limits: 'A standards study, not an implementation — does not include a working relying-party/authenticator integration.',
    },
    links: {},
  },
  {
    slug: 'emotion-detection-italian',
    title: 'Emotion Detection in Italian Text (VAD Regression)',
    category: 'nlp',
    summary:
      'University NLP project: fine-tuned Italian BERT (dbmdz/bert-base-italian-cased) for VAD emotion regression (Valence, Arousal, Dominance) on the EmoITA dataset, comparing three single-target models against one joint multi-target model.',
    stack: ['Python', 'PyTorch', 'BERT', 'Transformers', 'NLP'],
    status: 'public-code',
    featured: false,
    metrics: [
      { label: 'Type', value: 'University project' },
      { label: 'Best Pearson r', value: '0.71 (Valence)' },
      { label: 'Approach', value: 'Single- vs multi-target' },
    ],
    body: {
      problem:
        'Predicting continuous emotional dimensions (Valence, Arousal, Dominance) from text needs a language-specific model for Italian, where affective-computing resources are far scarcer than for English, plus an explicit comparison of modeling strategies rather than a single untested design choice.',
      approach:
        'Fine-tuned dbmdz/bert-base-italian-cased on the EmoITA dataset under two competing setups: three single-target regressors (one BERT per dimension) versus one multi-target regressor predicting V, A and D jointly, freezing the bottom transformer layers and training only the top layers plus a linear regression head.',
      architecture:
        'Both setups share the same backbone, loss (SmoothL1) and training loop with early stopping on validation loss; they differ only in the regression head\'s output size (1 vs 3) and whether each dimension is trained as a separate model or jointly.',
      results:
        'Pearson r between 0.54 and 0.71 and MAE between 0.28 and 0.36 (on a 1-5 scale) across both setups. The joint model reached the highest single-dimension correlation (Valence, r=0.71), while the three single-target models were more consistent across dimensions — both approaches are reported side by side rather than declaring a single "winner".',
      limits:
        'A university project evaluated on the EmoITA benchmark rather than production-scale or multi-domain Italian text; the single-target setup also evaluates directly against gold labels rather than the full blind-submission protocol of the original challenge, a simplification disclosed in the repository.',
    },
    links: { code: 'https://github.com/flaviagaglio/EmotivITA-BERT-VAD' },
  },
  {
    slug: 'handwriting-analysis',
    title: 'Handwriting Analysis for Classification',
    category: 'ml',
    summary: 'Predictive models in Python to classify handwriting patterns, exploring feature extraction and neural network architectures.',
    stack: ['Python', 'Neural Networks'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Type', value: 'Coursework project' }],
    body: {
      problem: 'Classifying handwriting patterns requires turning visual, variable strokes into features a model can learn from reliably.',
      approach: 'Explored multiple feature-extraction strategies feeding into neural network classifiers, comparing how representation choices affected classification performance.',
      architecture: 'A feature-extraction stage followed by neural network classifiers, iterated over multiple architectures during coursework.',
      results: 'Working classifiers evaluated on the coursework dataset, used to compare feature-extraction and architecture choices directly.',
      limits: 'A coursework-scale project on a fixed academic dataset, not validated on handwriting distributions beyond it.',
    },
    links: {},
  },
  {
    slug: 'personality-trait-classification',
    title: 'Personality Trait Classification via Image Analysis',
    category: 'ml',
    summary: 'Machine learning models to predict personality traits from image data, using feature engineering and ensemble methods.',
    stack: ['Python', 'ML', 'Ensemble Methods'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Type', value: 'Coursework project' }],
    body: {
      problem: 'Predicting personality traits from image data is a noisy, indirect signal problem — the features that matter are not obvious.',
      approach: 'Engineered features from image data and compared them against ensemble methods (combining multiple models) to improve robustness over any single classifier.',
      architecture: 'A feature engineering stage followed by ensemble classifiers, evaluated against simpler single-model baselines.',
      results: 'Ensemble methods outperformed single-model baselines on the coursework dataset, in line with the expected benefit of combining classifiers.',
      limits: 'Predicting personality from images is an inherently weak-signal task; results reflect the specific labeled dataset used, not a validated general claim.',
    },
    links: {},
  },
  {
    slug: 'male-infertility-prediction',
    title: 'Male Infertility Prediction from Clinical Andrology Data',
    category: 'ml',
    summary:
      'Research project classifying Controls vs Infertile subjects from clinical andrology data: 13 tuned model configurations across Decision Trees, MLP, SVM and gradient-boosting ensembles, validated with repeated/nested cross-validation, statistical significance testing and SHAP explainability.',
    stack: ['Python', 'scikit-learn', 'XGBoost', 'LightGBM', 'Optuna', 'SHAP'],
    status: 'public-code',
    featured: false,
    metrics: [
      { label: 'Models compared', value: '13 configs, 6 families' },
      { label: 'Best F1 (held-out)', value: '0.740' },
      { label: 'Explainability', value: 'SHAP + permutation' },
    ],
    body: {
      problem:
        'Distinguishing infertile from control subjects from clinical data is not a trivially separable problem — no single feature correlates with the outcome above r≈0.4 — and a clinical setting demands results trustworthy enough to discuss with a physician, not just an accuracy number.',
      approach:
        'Built a leakage-free scikit-learn pipeline (imputation, encoding, scaling, mutual-information feature selection) around 13 tuned configurations: the three required families — Decision Tree, MLP, SVM, 3 configurations each — plus Random Forest, Gradient Boosting, XGBoost and a LightGBM model tuned via Bayesian optimization (Optuna), then combined the best three into a stacking ensemble.',
      architecture:
        'Every model is a full Pipeline (preprocessing → feature selection → classifier) fit only on the training fold, tuned via grid/randomized search or Optuna. Validated with a held-out test split, repeated and nested stratified cross-validation, McNemar and bootstrap significance tests, calibration curves, and an external validation subset with structurally missing features imputed only by the training-fitted pipeline.',
      results:
        "Best held-out F1 of 0.740 (Gradient Boosting, ROC-AUC 0.749), but McNemar and bootstrap tests show the top five models are statistically indistinguishable — reported as an honest finding rather than overselling a single 'winner'. SHAP and permutation importance independently converge on age and WHO semen parameters as the dominant predictors, with no reliance on socio-demographic shortcuts, which validates clinical plausibility rather than just accuracy.",
      limits:
        "The external validation subset is small (209 records) and missing three features by design, so it stresses robustness under missing data more than it proves generalization to a new population; and like most clinical datasets available for this kind of work, it doesn't include hormonal or genetic variables that could sharpen the signal further.",
    },
    links: { code: 'https://github.com/flaviagaglio/male-infertility-prediction-ml' },
  },
  {
    slug: 'vinyl-lottery',
    title: 'Vinyl Lottery — Client-Server System',
    category: 'systems',
    summary: 'Concurrent client-server application in C on Linux using TCP/IP, threads and System V IPC for a vinyl lottery game.',
    stack: ['C', 'TCP/IP', 'System V IPC'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Language', value: 'C' }, { label: 'IPC', value: 'System V' }],
    body: {
      problem: 'Building a correct concurrent client-server system in C means handling shared state, synchronization and network I/O without the safety nets higher-level languages provide.',
      approach: 'Implemented a multi-client lottery game server in C, using threads for concurrent client handling and System V IPC (shared memory/semaphores) for coordinating shared game state.',
      architecture: 'TCP/IP socket server accepting concurrent client connections, worker threads per client, and System V IPC primitives synchronizing access to shared lottery state.',
      results: 'A working concurrent server correctly handling multiple simultaneous clients without race conditions on shared state, verified through testing during the coursework.',
      limits: 'Built as a systems-programming exercise on a single machine/network segment, not hardened or load-tested for production deployment.',
    },
    links: {},
  },
  {
    slug: 'tic-tac-toe-client-server',
    title: 'Tic Tac Toe — Client-Server Game',
    category: 'systems',
    summary: 'Networked Tic Tac Toe game in Java with object-oriented design and client-server architecture.',
    stack: ['Java', 'OOP'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Language', value: 'Java' }],
    body: {
      problem: 'A simple game is a useful, low-risk vehicle for practicing clean networked client-server design end to end.',
      approach: 'Built a networked Tic Tac Toe game in Java with an object-oriented design separating game logic, networking, and client presentation.',
      architecture: 'Client-server model over sockets, with game state and turn logic owned by the server and a thin client responsible for input/display.',
      results: 'A fully playable networked two-player game with clean separation between game logic and networking layers.',
      limits: 'Scoped as a coursework exercise in OOP and client-server design, not built for matchmaking, reconnection, or scale.',
    },
    links: {},
  },
  {
    slug: 'wireless-sensor-network',
    title: 'Wireless Sensor Network for Dehumidifier Control',
    category: 'systems',
    summary: 'Simulated a wireless sensor network in MATLAB (TrueTime) with fuzzy logic control for a dehumidification system.',
    stack: ['MATLAB', 'Fuzzy Logic'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Simulator', value: 'TrueTime (MATLAB)' }],
    body: {
      problem: 'Networked control systems need to handle sensor noise and imprecise measurements gracefully, not just react to exact thresholds.',
      approach: 'Simulated a wireless sensor network using TrueTime (a MATLAB/Simulink toolbox for networked control systems), with a fuzzy logic controller driving dehumidifier behavior from sensor readings.',
      architecture: 'Distributed sensor nodes reporting over a simulated wireless network to a fuzzy logic controller, which maps imprecise humidity readings to graded control actions rather than hard on/off thresholds.',
      results: 'A working simulated control loop where fuzzy logic produced smoother dehumidifier behavior than a simple threshold controller would.',
      limits: 'A simulation exercise in TrueTime, not a deployed physical sensor network — real-world radio interference and hardware constraints are out of scope.',
    },
    links: {},
  },
  {
    slug: 'airport-flight-database',
    title: 'Airport Flight Database',
    category: 'data',
    summary: 'Conceptual, logical and physical design of an SQL database to simulate airport flight operations.',
    stack: ['SQL', 'Database Design'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Scope', value: 'Conceptual → physical design' }],
    body: {
      problem: 'Airport flight operations involve many interrelated entities (flights, gates, crew, aircraft) that need a schema robust enough to avoid data anomalies.',
      approach: 'Full database design process from conceptual (ER modeling) through logical (relational schema, normalization) to physical (indexes, constraints) design.',
      architecture: 'A normalized relational schema modeling flights, gates, aircraft and crew relationships, with constraints enforcing operational business rules.',
      results: 'A complete, normalized schema covering the three standard design stages, validated against representative sample queries.',
      limits: 'A design exercise rather than a deployed system with real operational data volume or concurrent-transaction load testing.',
    },
    links: {},
  },
  {
    slug: 'variance-test',
    title: 'Variance Test: Theory and Applications',
    category: 'data',
    summary: 'MATLAB project exploring variance testing methodologies and their practical applications.',
    stack: ['MATLAB', 'Statistics'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Tool', value: 'MATLAB' }],
    body: {
      problem: 'Understanding when a variance test is actually valid — and what it can and cannot tell you — matters more than running the test itself.',
      approach: 'Implemented and explored variance testing methodologies in MATLAB, applying them to sample datasets to illustrate their assumptions and practical use.',
      architecture: 'A set of MATLAB scripts implementing the statistical tests and applying them to worked examples.',
      results: 'A clear, worked-through illustration of variance testing methodology and its assumptions, applied to sample data.',
      limits: 'A theory-and-application coursework project, not a statistical software package intended for reuse.',
    },
    links: {},
  },
  {
    slug: 'numerical-integration',
    title: 'Numerical Integration: Quadrature Methods',
    category: 'data',
    summary: 'Comprehensive MATLAB study on quadrature formulas and numerical integration techniques.',
    stack: ['MATLAB', 'Numerical Methods'],
    status: 'academic-private',
    featured: false,
    metrics: [{ label: 'Tool', value: 'MATLAB' }],
    body: {
      problem: 'Numerical integration methods trade off accuracy, stability and computational cost differently depending on the function being integrated.',
      approach: 'A comprehensive study comparing quadrature formulas (methods for numerically approximating integrals) in MATLAB across different function types.',
      architecture: 'MATLAB implementations of multiple quadrature methods, benchmarked against each other and against known closed-form integrals.',
      results: 'A comparative view of how different quadrature methods perform across function types, grounded in direct implementation rather than theory alone.',
      limits: 'A coursework study of established numerical methods, not a novel quadrature technique.',
    },
    links: {},
  },
  {
    slug: 'keys',
    title: 'Keys — Key Signature Finder',
    category: 'music',
    summary: 'Find the key signature of any major or minor tonality: number of accidentals and which notes are sharp or flat.',
    stack: ['JavaScript', 'Music Theory'],
    status: 'live-demo',
    featured: false,
    metrics: [{ label: 'Type', value: 'Web tool' }],
    body: {
      problem: 'Working out a key signature from memory or by ear is slow when you just need the answer while practicing or writing.',
      approach: 'Pick a tonic, get the key signature instantly — accidentals are derived algorithmically from the circle-of-fifths sharp/flat order, not hardcoded per key.',
      architecture: 'Single-page vanilla JavaScript — a note grid feeding a circle-of-fifths calculation, no backend.',
      results: 'A fast, verified reference (all 15 major keys and relative minors checked against music theory) used during practice and writing.',
      limits: 'Covers standard major/minor keys; doesn’t extend to non-diatonic or exotic scales.',
    },
    links: { demo: '/keys/' },
  },
  {
    slug: 'passwords',
    title: 'Passwords — Password Generator',
    category: 'security',
    summary: 'Password generator with a cyberpunk terminal look — adjustable length and character types, real-time strength meter.',
    stack: ['JavaScript', 'HTML / CSS'],
    status: 'live-demo',
    featured: false,
    metrics: [{ label: 'Type', value: 'Web tool' }],
    body: {
      problem: 'Generating a genuinely varied, strong password by hand is unreliable, and most generators feel like an afterthought bolted onto a form.',
      approach: 'A generator with adjustable length and character-set options and a live strength meter, wrapped in a scanline cyberpunk-terminal look.',
      architecture: 'Self-contained vanilla JavaScript single page.',
      results: 'A tool actually used to generate passwords, not just a demo of the aesthetic.',
      limits: 'Randomness comes from Math.random(), not the Web Crypto API — fine for casual use, not for anything requiring cryptographically secure randomness.',
    },
    links: { demo: '/passwords/' },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
