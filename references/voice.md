# Voice and pronunciation

The narration is voiced **line by line, offline, with Kokoro** (Kokoro-82M, open weights, Apache-2.0).  The same
text with the same settings always gives the same audio, so a film never changes voice between drafts, and editing
one line re-voices only that line.  Never voice a whole script in one take (a podcast tool, a recording split by
pauses): the delivery changes from take to take and the line boundaries have to be guessed.

## Once per machine (or per Cowork workspace)

1. `pip install kokoro-onnx soundfile` (Claude Cowork's sandbox allows it).
2. `python voice.py --setup` downloads the model (~350 MB) into `<home>/kokoro/`:
   - `https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx` (~325 MB)
   - `https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin` (~28 MB)

   If the sandbox can't reach GitHub, the user downloads both in their browser and puts them in
   `<workspace>/.tredence/kokoro/`.
3. `python voice.py --audition`: the film's first two lines (or a stock sample full of names and numbers) in six
   voices, saved as `audition/<voice>.wav` in the build folder.  Copy the folder into the workspace so the user can
   play them.  Kokoro's strongest English voices: `am_michael`, `af_heart`, `am_fenrir`, `bf_emma`, `bm_george`,
   `af_bella`; any other with `--voices a,b,c`; a blend with `am_michael:0.7,am_fenrir:0.3`.
4. `python voice.py --use <voice> [--speed 0.95]` saves `<home>/voice.json`.  Every film after uses it, until the
   user picks again.  `film.json` `voice` overrides it for one film.

`<home>` is `<workspace>/.tredence` (`new_film.py` finds it beside `working/` and writes it into `film.json`), else
`$TREDENCE_HOME`, else `~/.tredence`.  In Claude Cowork the sandbox's home folder doesn't survive; the workspace does.

## Every film: pronunciation first

Mispronounced words are the most common complaint.  Nothing is left for the voice to guess:

1. **Written for the ear automatically** (`speech.py`): `$1.17M` → "1.17 million dollars", `7:30` → "seven thirty",
   `11:00 AM` → "eleven A M", `1.5x` → "1.5 times", `24/7`, `e.g.`, `vs.`, `Q3`, `FY26`, `3-4 weeks` → "3 to 4
   weeks", `21%`.  The captions keep the written form.
2. **The lexicon**, merged in this order (later wins), whole words, case-sensitive:
   - `<skill>/film/lexicon/tredence.json`: Tredence, Microsoft product names (Dynamics 365 → "three sixty-five",
     Power BI), common acronyms (ERP, KPI, SLA, OTIF ...), the Microsoft fictitious companies.
   - `<home>/lexicon.json`: yours, kept across films (a customer's industry terms you use often).
   - `<build>/lexicon.json`: this film's people, companies, products and acronyms from the cast and data sheet.

   ```json
   {"say": {"Coho Winery": "Koho Winery", "OEE": "O E E", "Nguyen": "Nwen"},
    "ipa": {"Tredence": "tɹˈɛdəns"}}
   ```
   `say` is a respelling (works with every engine).  `ipa` is exact phonemes in Kokoro's espeak-style IPA, for a
   name a respelling can't fix; copy the style `speech.py` shows, or ask the user how the name is said.
3. **Look before voicing**: `python speech.py` prints every line as it will be spoken (`~` marks a changed line,
   `/word/` an exact-phoneme word) and lists "check:" words: all-caps acronyms, letters mixed with digits, CamelCase
   names that no list covers.  `voice.py` prints the same list after voicing.  Add an entry for each one that matters.
4. **Listen automatically** (optional): `pip install faster-whisper`, then `python voice.py --listen` transcribes
   each voiced line offline (Whisper base.en, ~150 MB, downloaded once into `<home>/whisper`) and reports words
   that came back different ("'Fabrikam' heard as 'fabric arm'"), in `listen.json`.  Speech-to-text writes numbers
   its own way, so not every difference is a mistake: check the flagged ones, fix with the lexicon, voice again.

Ask the user about any name you aren't sure how to say (a customer's product, a place, a person), once, before
voicing; put the answer in `<home>/lexicon.json` if it will come up again.

## Other engines

| Engine | When | Notes |
|---|---|---|
| `kokoro` | Default, Claude Cowork on Mac | Offline, free, deterministic.  Full lexicon (respellings and phonemes) |
| `azure` | Copilot Cowork on Windows, where packages can't be installed | `SPEECH_KEY` + `SPEECH_REGION`.  Prefer a non-multilingual voice (`en-US-AndrewNeural`, set `voice.azure_name`); multilingual voices drift in tone between lines.  Respellings apply; phonemes don't |
| `say` | Scratch only, and only when the commands run on the Mac itself (not in Cowork's sandbox) | `voice.say_name`, e.g. "Ava (Premium)" |
| `sapi` | Scratch only, Windows | Timing drafts; never delivered |

## What to tell the user

The audio can't be listened to here.  Report the voice and speed used, the measured levels (`mix.py --levels`), the
listening check's flagged lines (or that it didn't run), and the "check:" words you left without an entry.
