import { AppInputs, AppOutputs } from "../types";

const SYSTEM_INSTRUCTION = `
Kamu adalah AI asisten produksi musik dan pakar SEO YouTube tahun 2026. Tugasmu adalah memproses input dari pengguna dan menghasilkan 4 output spesifik dengan format yang sudah ditentukan.

PENTING: Perhatikan "Target Audience" yang dipilih pengguna (Indonesia atau Global).
- Jika Target Audience = "Indonesia": Gunakan bahasa Indonesia untuk lirik, SEO, dan instruksi teks. Karakter visual adalah wanita Indonesia berhijab elegan (kecuali jika ada foto referensi).
- Jika Target Audience = "Global": Gunakan bahasa Inggris (atau campuran Korea-Inggris jika vibe mengarah ke K-Pop) untuk lirik. SEO harus dalam bahasa Inggris. Karakter visual harus menyesuaikan standar global (misal: K-Pop Idol look untuk Korea, atau Western Pop Star untuk USA).

BAGIAN 1: LOGIKA OUTPUT (HASIL GENERATE)
Aplikasi harus mengeluarkan 4 bagian berikut secara berurutan:

Output 1: Lirik Lagu untuk Suno.com
Aturan: Buat lirik berdasarkan "Judul Lagu" dan "Tema Cerita". Gaya bahasa dan diksi harus 100% menyesuaikan "Vibe Penyanyi", "Target Audience", dan "Bahasa Lirik" yang dipilih.
WAJIB: Masukkan tag tempo [BPM: XXX] (sesuai nilai BPM yang di-input) di bagian paling atas lirik sebelum tag lainnya.
Format: Suno.com Style. Wajib gunakan meta-tags struktur lagu dalam kurung siku [] untuk memisahkan setiap bagian lagu secara jelas, contoh: [Verse 1], [Verse 2], [Pre-Chorus], [Chorus], dan [Bridge]. Letakkan tag di baris tersendiri sebelum bait liriknya.
PENTING: Jika "Bahasa Lirik" mengandung kata "Mix", buatlah lirik yang menggabungkan bahasa-bahasa yang disebutkan di dalam kurung secara kreatif (misal: Verse 1 menggunakan bahasa pertama, Chorus menggunakan bahasa kedua, dst). Pastikan transisi antar bahasa terasa halus dan puitis.
TIDINESS RULES:
1. JANGAN gunakan format Markdown (bold/italic).
2. Kelompokkan meta-tag intro/tempo di awal tanpa baris kosong di antaranya.
3. Berikan SATU baris kosong antara meta-tag dan lirik di bawahnya.
4. Berikan SATU baris kosong antara bait (verse/chorus).
5. Pastikan lirik rapi, rata kiri, dan siap di-copy.
6. WAJIB: Tulis lirik baris demi baris. JANGAN menyambung kalimat lirik dalam satu baris panjang. Setiap baris harus dipisahkan oleh 'Enter' (newline).

Output 2: Style Prompt untuk Suno.com
Aturan: Buat 3 variasi deskripsi genre musik yang berbeda namun tetap sesuai dengan "Vibe Penyanyi". Masing-masing sepanjang 1-2 kalimat (maksimal 120 karakter) dalam bahasa Inggris.
WAJIB: Masukkan nilai BPM yang diberikan pengguna (misal: "120bpm") ke dalam setiap variasi style prompt.
Variasi 1: Gaya standar/populer.
Variasi 2: Gaya yang lebih eksperimental atau akustik.
Variasi 3: Gaya yang lebih intens atau sinematik.
Contoh: "1990s indonesian slow rock, melancholic power ballad, emotional female vocals, heavy rock drums, crying guitar solo."

Output 3: Prompt AI Image Generator (Thumbnail YouTube)
Aturan: Buat prompt gambar dalam bahasa Inggris tingkat lanjut (fotorealistik, sinematik) yang menggabungkan karakter visual (sesuai Target Audience) dengan "Latar Tempat Thumbnail" yang di-input.
Aturan Tambahan Teks Overlay: Wajib masukkan instruksi pembuatan teks (Typography) ala cover VCD Karaoke (untuk Indo) atau Modern Digital Single (untuk Global) ke dalam prompt gambar persis seperti template ini (ganti bagian dalam kurung siku dengan data dinamis):
"The image features specific text overlays mimicking a [TEMA COVER]: Top Left corner: small black text 'Official Music Video'. Middle Right (Large Title): The text '[JUDUL LAGU]' written in a large, white, artistic brush-script font with a rough grunge texture. Above the title: small white text '[GENRE DARI VIBE] 2026'. Below the title: Bright Yellow bold serif text saying '[NAMA CHANNEL]'. Bottom Left: big white text '[2 BARIS KUTIPAN LIRIK PALING SEDIH DARI LAGU] 💔'."

Output 4: Metadata SEO YouTube 2026
Buatkan metadata SEO yang dioptimalkan untuk algoritma YouTube tahun 2026 (Bahasa sesuai Target Audience) dengan format berikut:
Judul Video: Berikan 3 pilihan judul yang mengundang klik (mengandung judul lagu, kata kunci emosi/galau, dan "[NAMA CHANNEL]").
Deskripsi Video: Buat paragraf pembuka yang emosional. Sisipkan lirik lengkap lagu. Wajib sertakan kalimat Call to Action: "Support terus channel [NAMA CHANNEL] dengan klik Like, Share, dan Subscribe!" (atau versi Inggris untuk Global).
Tags: Berikan 20 kata kunci relevan (dipisah koma), termasuk "[NAMA CHANNEL], lagu galau terbaru 2026, [Vibe Penyanyi]".
Pin Komen (Video MV): Buat 1 komentar pancingan interaktif untuk disematkan.
Metadata YouTube Shorts: Berikan saran Judul Shorts, Tags Shorts, dan deskripsi singkat yang mengarahkan penonton untuk menonton video panjang di [NAMA CHANNEL].

Output 5: Visual Assets (Text-to-Image & Image-to-Video)
Aturan: Buat 4 adegan (scenes) yang mewakili alur cerita lagu berdasarkan lirik.
Every adegan must have:
1. Lyrics Snippet: Potongan lirik yang mendasari adegan tersebut.
2. Image Prompt: Prompt bahasa Inggris untuk AI Image Generator. WAJIB memasukkan deskripsi karakter dan latar tempat yang sudah ditentukan ke dalam setiap prompt adegan agar konsisten. Fokus pada komposisi sinematik, lighting, dan emosi.
3. Video Prompts: 2 pilihan prompt bahasa Inggris untuk Image-to-Video (motion prompts). Contoh: "Slow zoom into her eyes as she tears up", "Cinematic camera pan showing the vast empty beach".

PENTING: Berikan output dalam format JSON yang valid dengan key: "lyrics", "stylePrompts", "basePrompt", "imagePrompt", "characterDescription", "textOverlayInstructions", "seoMetadata", "visualAssets".
- "lyrics": Lirik lagu lengkap.
- "translation": Terjemahan LENGKAP lirik lagu ke dalam Bahasa Indonesia. WAJIB menerjemahkan seluruh lirik baris demi baris secara akurat. Jika lirik asli sudah Bahasa Indonesia, tuliskan kembali lirik tersebut baris demi baris.
- "stylePrompts": Array berisi 3 string variasi style.
- "basePrompt": Prompt gambar TANPA instruksi teks overlay (hanya deskripsi visual karakter dan latar).
- "imagePrompt": Prompt gambar LENGKAP dengan instruksi teks overlay.
- "characterDescription": Deskripsi visual karakter yang konsisten.
- "textOverlayInstructions": HANYA instruksi teks overlay (Typography) tersebut.
- "seoMetadata": Object berisi:
    - "titles": Array 3 string judul video.
    - "description": String deskripsi video (termasuk lirik).
    - "tags": String kata kunci dipisah koma.
    - "pinnedComment": String komentar pancingan.
    - "shorts": Object berisi "title", "description", "tags" untuk YouTube Shorts.
- "visualAssets": Object berisi "scenes" (Array 4 object dengan key: "id", "lyricsSnippet", "imagePrompt", "videoPrompts").

WAJIB: Output harus berupa JSON murni yang utuh, valid, dan well-formatted. JANGAN menuliskan kata pengantar, penjelasan, teks penutup, atau markup di luar block JSON. Mulai response langsung dengan '{' dan akhiri langsung dengan '}'.
`;

const getApiKeysList = (): string[] => {
  let keysStr = '';
  if (typeof window !== 'undefined') {
    keysStr = localStorage.getItem('gemini_api_key') || '';
  }
  if (!keysStr) keysStr = process.env.GEMINI_API_KEY || '';
  
  return keysStr.split(/[\n, ]+/).map(k => k.trim()).filter(k => k.length > 0);
};

const getNormalizedBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    let localBaseUrl = localStorage.getItem('gemini_base_url');
    if (localBaseUrl) {
      localBaseUrl = localBaseUrl.trim();
      if (!localBaseUrl.startsWith('http://') && !localBaseUrl.startsWith('https://')) {
        localBaseUrl = 'https://' + localBaseUrl;
      }
      if (localBaseUrl.endsWith('/')) localBaseUrl = localBaseUrl.slice(0, -1);
      if (localBaseUrl.endsWith('/v1beta')) localBaseUrl = localBaseUrl.slice(0, -7);
      else if (localBaseUrl.endsWith('/v1alpha')) localBaseUrl = localBaseUrl.slice(0, -8);
      else if (localBaseUrl.endsWith('/v1')) localBaseUrl = localBaseUrl.slice(0, -3);
      if (localBaseUrl.endsWith('/')) localBaseUrl = localBaseUrl.slice(0, -1);
      return localBaseUrl;
    }
  }
  return 'https://api.kie.ai';
};

const getKieSettings = () => {
  if (typeof window !== 'undefined') {
    const model = localStorage.getItem('kie_model') || 'gpt-5.2';
    const maxTokens = parseInt(localStorage.getItem('kie_max_tokens') || '4096', 10);
    const topP = parseFloat(localStorage.getItem('kie_top_p') || '0.85');
    const temp = parseFloat(localStorage.getItem('kie_temperature') || '0.95');
    return { model, maxTokens, topP, temp };
  }
  return { model: 'gpt-5.2', maxTokens: 4096, topP: 0.85, temp: 0.95 };
};

const getNormalizedModelName = (model: string): string => {
  if (model === 'gpt-5.2') {
    return 'gpt-5-2';
  }
  return model;
};

const getKieUrl = (baseUrl: string, model: string): string => {
  if (baseUrl.includes('/v1/chat/completions')) {
    return baseUrl;
  }
  if (baseUrl.includes('api.kie.ai')) {
    const path = getNormalizedModelName(model);
    return `${baseUrl}/${path}/v1/chat/completions`;
  }
  return `${baseUrl}/v1/chat/completions`;
};

const executeWithKeyRotation = async <T>(
  operation: (apiKey: string, baseUrl: string) => Promise<T>
): Promise<T> => {
  let keys = getApiKeysList();
  if (keys.length === 0) throw new Error("API Key KIE.AI / Gemini tidak ditemukan. Harap masukkan API Key di menu Pengaturan.");
  
  const baseUrl = getNormalizedBaseUrl();
  let lastError: any;
  
  while (keys.length > 0) {
    const apiKey = keys[0];
    try {
      return await operation(apiKey, baseUrl);
    } catch (error: any) {
      lastError = error;
      console.warn(`API call failed with key ${apiKey.substring(0, 4)}... Error: ${error.message || error}`);
      
      const errMsg = error?.message?.toLowerCase() || '';
      const status = error?.status;
      
      // Remove key if it's quota limit, unauthorized, or bad credentials
      if (status === 429 || status === 401 || status === 403 || status === 400 || 
          errMsg.includes('quota') || errMsg.includes('exhausted') || 
          errMsg.includes('invalid') || errMsg.includes('unauthorized') || 
          errMsg.includes('not found') || errMsg.includes('cors') || errMsg.includes('fetch')) {
        console.log("Removing failed/depleted API key and trying next...");
        keys.shift(); // Remove the current key from the array
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('gemini_api_key', keys.join('\n'));
          window.dispatchEvent(new CustomEvent('gemini_keys_updated', { detail: keys.join('\n') }));
        }
      } else {
        // Other errors (e.g., abort, user cancellation, schema mismatches)
        throw error;
      }
    }
  }
  
  throw lastError;
};

export async function validateApiKey(apiKeyInput: string): Promise<boolean> {
  const keys = apiKeyInput.split(/[\n, ]+/).map(k => k.trim()).filter(k => k.length > 0);
  if (keys.length === 0) return false;
  
  const baseUrl = getNormalizedBaseUrl();
  const settings = getKieSettings();
  let lastError: any;
  
  for (const apiKey of keys) {
    try {
      const url = getKieUrl(baseUrl, settings.model);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: getNormalizedModelName(settings.model),
          messages: [{ role: "user", content: "ping" }],
          max_tokens: 5,
        })
      });
      
      if (response.ok) {
        return true; // Key compiles and validates via OpenAI chat framework!
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn(`Validation failed for key ${apiKey.substring(0, 4)}...`, error);
      lastError = error;
    }
  }
  
  if (lastError) throw lastError;
  return false;
}

interface ChatCompletionParams {
  messages: { role: string; content: any }[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  response_format?: any;
}

async function executeKieChatCompletion(params: ChatCompletionParams): Promise<any> {
  const settings = getKieSettings();
  
  // Try selected model, and fall back to stable alternatives if it fails
  const modelsToTry = [settings.model];
  const standardFallbacks = ['gpt-4o-mini', 'gpt-4o', 'claude-3-5-sonnet', 'gemini-1.5-flash'];
  for (const fModel of standardFallbacks) {
    if (fModel !== settings.model) {
      modelsToTry.push(fModel);
    }
  }

  let finalError: any = null;

  for (const model of modelsToTry) {
    try {
      return await executeWithKeyRotation(async (apiKey, baseUrl) => {
        const body: any = {
          model: getNormalizedModelName(model),
          messages: params.messages,
          temperature: params.temperature !== undefined ? params.temperature : settings.temp,
          top_p: params.top_p !== undefined ? params.top_p : settings.topP,
          max_tokens: params.max_tokens !== undefined ? params.max_tokens : settings.maxTokens,
        };

        const lowerModel = model.toLowerCase();
        if (lowerModel.includes("gpt-4") || lowerModel.includes("gpt-3") || params.response_format) {
          body.response_format = { type: "json_object" };
        }

        const url = getKieUrl(baseUrl, model);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // Check for various API/Proxy-level error representations
        if (data.error) {
          const errMsg = typeof data.error === 'string' 
            ? data.error 
            : (data.error.message || data.error.code || JSON.stringify(data.error));
          throw new Error(`API Error dari KIE.AI: ${errMsg}`);
        }
        if (data.code && data.code !== 200 && data.code !== "200") {
          const errorMsg = data.msg || data.message || "Internal Server Error";
          throw new Error(`KIE.AI Error (Status ${data.code}): "${errorMsg}".`);
        }
        if (data.msg && !data.choices) {
          throw new Error(`KIE.AI Error: ${data.msg}.`);
        }
        if (data.message && !data.choices) {
          throw new Error(`KIE.AI Message: ${data.message}`);
        }
        if (data.detail && !data.choices) {
          throw new Error(`KIE.AI Detail: ${data.detail}`);
        }

        if (!data.choices || data.choices.length === 0 || !data.choices[0]?.message?.content) {
          throw new Error(`KIE.AI memberikan respon kosong atau format tidak sesuai.`);
        }

        return data; // returns the full successful data response
      });
    } catch (err: any) {
      console.warn(`Attempt with model "${model}" failed. Trying fallback if available... Error:`, err.message || err);
      finalError = err;
    }
  }

  throw new Error(`Semua model percobaan gagal. Error terakhir: ${finalError?.message || finalError}`);
}

export async function describeImage(imageData: string): Promise<string> {
  const data = await executeKieChatCompletion({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe this image in detail for an AI image generator prompt. Focus on the person's appearance, clothing, pose, and the background environment. Keep it concise (1-2 sentences)."
          },
          {
            type: "image_url",
            image_url: {
              url: imageData
            }
          }
        ]
      }
    ],
    max_tokens: 300
  });
  const text = data.choices?.[0]?.message?.content || "";
  return text.trim() || "A person in the provided image.";
}

export async function remixLyricSnippet(snippet: string, instruction: string): Promise<string> {
  const prompt = `
Kamu adalah penulis lirik profesional. Tolong ubah/remix potongan lirik berikut sesuai dengan instruksi: "${instruction}".
Hanya berikan respons berupa lirik yang sudah diubah tanpa teks pengantar, penjelasan, tanda kutip, atau penanda markdown tambahan (kecuali tag bait seperti [Chorus]).

Lirik asli:
${snippet}
`;

  const data = await executeKieChatCompletion({
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });
  return data.choices?.[0]?.message?.content?.trim() || snippet;
}

export async function enhanceLyricsWithTags(lyrics: string, style: string): Promise<string> {
  const prompt = `
Kamu adalah pakar AI musik untuk platform Suno.com. Tugasmu adalah menyisipkan meta-tag khusus Suno.com (structure tags & style tags) ke dalam lirik ini agar hasil lagu saat di-generate lebih hidup, berdimensi, dan sesuai dengan vibe.

Vibe / Style lagu: "${style}"

Instruksi PENTING:
1. Sisipkan metatag dalam kurung siku [], contoh: [Intro], [Guitar Solo], [Emotional Chorus], [Build-up], [Drop], [Sad Bridge], [Fade Out], [Outro].
2. Letakkan metatag ini di bagian yang strategis (misal di intro, setelah chorus, sebelum bridge, atau outro).
3. Sesuaikan pilihan kata di dalam metatag dengan Vibe lagu tersebut (jika sedih gunakan tag melankolis/instrumental sedih, jika upbeat gunakan tag enerjik).
4. JANGAN/MAUPUN MENGUBAH teks lirik asli. HANYA tambahkan tag-tag baru.
5. Tuliskan lirik yang sudah di-enhance tanpa embel-embel teks pengantar.

Lirik asli:
${lyrics}
`;

  const data = await executeKieChatCompletion({
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });
  return data.choices?.[0]?.message?.content?.trim() || lyrics;
}

function repairJson(jsonStr: string): string {
  // First, remove markdown block framing if present
  let cleanStr = jsonStr.replace(/```json\n?|```/g, '').trim();
  
  // Attempt standard clean parse
  try {
    JSON.parse(cleanStr);
    return cleanStr;
  } catch (e) {
    // Continue with repair heuristics
  }

  let repaired = "";
  let inString = false;
  let isEscaped = false;
  const stack: ('{' | '[')[] = [];

  for (let i = 0; i < cleanStr.length; i++) {
    const char = cleanStr[i];

    if (isEscaped) {
      repaired += char;
      isEscaped = false;
      continue;
    }

    if (char === '\\') {
      repaired += char;
      isEscaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      repaired += char;
      continue;
    }

    if (inString) {
      if (char === '\n') {
        repaired += '\\n';
        continue;
      }
      if (char === '\r') {
        continue;
      }
      if (char === '\t') {
        repaired += '\\t';
        continue;
      }
      repaired += char;
      continue;
    }

    if (char === '{') {
      stack.push('{');
      repaired += char;
    } else if (char === '[') {
      stack.push('[');
      repaired += char;
    } else if (char === '}') {
      if (stack.length > 0 && stack[stack.length - 1] === '{') {
        stack.pop();
      }
      repaired += char;
    } else if (char === ']') {
      if (stack.length > 0 && stack[stack.length - 1] === '[') {
        stack.pop();
      }
      repaired += char;
    } else {
      repaired += char;
    }
  }

  // If we ended inside a string, terminate it securely
  if (inString) {
    if (isEscaped) {
      if (repaired.endsWith('\\')) {
        repaired = repaired.slice(0, -1);
      }
    }
    repaired += '"';
  }

  repaired = repaired.trim();

  // Strip trailing invalid comma, colon, or spacer punctuations
  while (repaired.length > 0) {
    const lastChar = repaired[repaired.length - 1];
    if (lastChar === ',' || lastChar === ':' || lastChar === ' ' || lastChar === '\n' || lastChar === '\r') {
      repaired = repaired.slice(0, -1).trim();
    } else {
      break;
    }
  }

  // Handle a key that was left trailing without a value (e.g. , "someKey")
  if (repaired.endsWith('"')) {
    let countQuotes = 0;
    let idx = repaired.length - 1;
    while (idx >= 0) {
      if (repaired[idx] === '"' && (idx === 0 || repaired[idx - 1] !== '\\')) {
        countQuotes++;
        if (countQuotes === 2) {
          break;
        }
      }
      idx--;
    }
    if (countQuotes === 2) {
      const beforeQuote = repaired.slice(0, idx).trim();
      if (beforeQuote.endsWith(',') || beforeQuote.endsWith('{') || beforeQuote.endsWith('[')) {
        if (beforeQuote.endsWith(',')) {
          repaired = beforeQuote.slice(0, -1).trim();
        } else if (beforeQuote.endsWith('{') || beforeQuote.endsWith('[')) {
          repaired = beforeQuote;
        }
      }
    }
  }

  // Safe extra trim trailing punctuation after deleting un-valued key
  while (repaired.length > 0) {
    const lastChar = repaired[repaired.length - 1];
    if (lastChar === ',' || lastChar === ':' || lastChar === ' ' || lastChar === '\n' || lastChar === '\r') {
      repaired = repaired.slice(0, -1).trim();
    } else {
      break;
    }
  }

  // Re-close any unclosed opened brackets and braces in accurate reverse order
  while (stack.length > 0) {
    const openToken = stack.pop();
    if (openToken === '{') {
      repaired += '}';
    } else if (openToken === '[') {
      repaired += ']';
    }
  }

  return repaired;
}

function extractAndRepairJson(textOutput: string): any {
  const trimmedOutput = textOutput.trim();
  
  // Try direct parsing first
  try {
    const jsonString = trimmedOutput.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (e) {
    // Fallback to recovery strategies
  }

  const firstBrace = trimmedOutput.indexOf('{');
  if (firstBrace === -1) {
    throw new Error(`Format data (JSON) tidak ditemukan dalam respon AI. Teks respon asli: "${trimmedOutput.substring(0, 300)}${trimmedOutput.length > 300 ? '...' : ''}"`);
  }

  // Strategy 1: Slice from first brace to the absolute end of the string (recovers maximum truncated data)
  const candidateMax = trimmedOutput.slice(firstBrace);
  try {
    const repairedMax = repairJson(candidateMax);
    return JSON.parse(repairedMax);
  } catch (eMax) {
    console.warn("Failed parsing with Strategy 1 (Max slice):", eMax);
  }

  // Strategy 2: Slice from first brace to the last closing brace (handles trailing conversational text)
  const lastBrace = trimmedOutput.lastIndexOf('}');
  if (lastBrace > firstBrace) {
    const candidateBraced = trimmedOutput.slice(firstBrace, lastBrace + 1);
    try {
      const repairedBraced = repairJson(candidateBraced);
      return JSON.parse(repairedBraced);
    } catch (eBraced) {
      console.warn("Failed parsing with Strategy 2 (Braced slice):", eBraced);
    }
  }

  // Strategy 3: Pure fallback parsing using regex match (if any)
  const match = trimmedOutput.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const repairedMatch = repairJson(match[0]);
      return JSON.parse(repairedMatch);
    } catch (eMatch) {
      console.warn("Failed parsing with Strategy 3 (Regex match):", eMatch);
    }
  }

  throw new Error("Gagal memproses format data (JSON) dari KIE.AI karena respon terpotong atau format salah. Silakan coba klik generate lagi.");
}

export async function upscaleWithMagnificAI(imageUrl: string, prompt: string, apiKey: string): Promise<string> {
  const cleanPrompt = prompt.replace(/[^\w\s,.-]/g, '');
  
  try {
    const response = await fetch('https://api.magnific.ai/v1/upscale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        image: imageUrl,
        image_url: imageUrl,
        prompt: cleanPrompt,
        scale: 2,
        creativity: 5,
        resemblance: 4,
        hdr: 2,
        fractality: 1
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Magnific.ai Upscale Error (Status ${response.status}): ${errText || response.statusText}`);
    }

    const result = await response.json();
    const taskId = result.id || result.taskId;
    if (!taskId) {
      if (result.image || result.url || result.image_url) {
        return result.image || result.url || result.image_url;
      }
      throw new Error("Magnific.ai did not return a valid Task ID or output image.");
    }

    // Polling loop (max 45 seconds, checking every 3 seconds)
    const maxRetries = 15;
    for (let i = 0; i < maxRetries; i++) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      try {
        const pollResponse = await fetch(`https://api.magnific.ai/v1/tasks/${taskId}`, {
          headers: {
            'X-API-Key': apiKey,
            'Authorization': `Bearer ${apiKey}`
          }
        });
        
        if (pollResponse.ok) {
          const pollResult = await pollResponse.json();
          const status = (pollResult.status || '').toLowerCase();
          
          if (status === 'completed' || status === 'success' || pollResult.image || pollResult.image_url || pollResult.url) {
            const finalUrl = pollResult.image || pollResult.image_url || pollResult.url;
            if (finalUrl) return finalUrl;
          }
          
          if (status === 'failed' || status === 'error') {
            throw new Error(`Magnific task gagal: ${pollResult.error || 'Unknown error'}`);
          }
        } else {
          // Fallback to upscale/{taskId} polling
          const altResponse = await fetch(`https://api.magnific.ai/v1/upscale/${taskId}`, {
            headers: {
              'X-API-Key': apiKey,
              'Authorization': `Bearer ${apiKey}`
            }
          });
          if (altResponse.ok) {
            const altResult = await altResponse.json();
            const status = (altResult.status || '').toLowerCase();
            
            if (status === 'completed' || status === 'success' || altResult.image || altResult.image_url || altResult.url) {
              const finalUrl = altResult.image || altResult.image_url || altResult.url;
              if (finalUrl) return finalUrl;
            }
            if (status === 'failed' || status === 'error') {
              throw new Error(`Magnific task gagal: ${altResult.error || 'Unknown error'}`);
            }
          }
        }
      } catch (pollErr: any) {
        console.warn("Polling retry error:", pollErr);
      }
    }

    throw new Error("Magnific.ai timeout: Upscaling took too long.");
  } catch (err: any) {
    throw new Error(err.message || String(err));
  }
}

export async function generateThumbnailImage(prompt: string, characterImage?: string): Promise<string> {
  const seed = Math.floor(Math.random() * 1000000);
  const refinedPrompt = prompt.replace(/[^\w\s,.-]/g, ''); // Clean special symbols for URL formatting
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(refinedPrompt)}?width=1280&height=720&nologo=true&seed=${seed}&enhance=true`;

  if (typeof window !== 'undefined') {
    const magnificKey = localStorage.getItem('magnific_api_key') || '';
    if (magnificKey.trim()) {
      try {
        console.log("Magnific API Key found. Fetching initial layout and upscaled detail via Magnific...");
        // Use the initial image and prompt to upscale/enhance detail via Magnific AI
        const enhancedUrl = await upscaleWithMagnificAI(characterImage || pollinationsUrl, refinedPrompt, magnificKey);
        return enhancedUrl;
      } catch (e: any) {
        console.error("Magnific Upscale Failed, falling back to Pollinations:", e);
        // Dispatch warning event for UI
        window.dispatchEvent(new CustomEvent('magnific_error', { detail: e.message || String(e) }));
        return pollinationsUrl;
      }
    }
  }

  return pollinationsUrl;
}

export async function generateStudioAssets(inputs: AppInputs): Promise<AppOutputs> {
  const prompt = `
    Nama Channel: ${inputs.channelName}
    Judul Lagu: ${inputs.songTitle}
    Tema Cerita: ${inputs.storyTheme}
    Vibe Penyanyi: ${inputs.vibe}
    Latar Tempat Thumbnail: ${inputs.thumbnailLocation}
    Deskripsi Karakter: ${inputs.characterDescription || 'Sesuai target audience'}
    Target Audience: ${inputs.targetAudience}
    Bahasa Lirik: ${inputs.lyricsLanguage}
    BPM (Tempo): ${inputs.bpm}
  `;

  const data = await executeKieChatCompletion({
    messages: [
      {
        role: "system",
        content: SYSTEM_INSTRUCTION
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const textOutput = data.choices?.[0]?.message?.content || "";
  if (!textOutput) {
    throw new Error(`KIE.AI memberikan respon kosong atau format tidak sesuai. Respon lengkap: ${JSON.stringify(data)}`);
  }
  
  const result = extractAndRepairJson(textOutput);
  
  const ensureString = (val: any): string => {
    if (typeof val === 'string') return val;
    if (val === null || val === undefined) return '';
    return JSON.stringify(val, null, 2);
  };

  const ensureStringArray = (val: any): string[] => {
    if (Array.isArray(val)) return val.map(v => ensureString(v));
    if (typeof val === 'string') return [val];
    return [];
  };

  // Post-process lyrics to ensure [Tag] is followed by a newline and clean for Suno
  let lyrics = ensureString(result.lyrics);
  if (lyrics) {
    lyrics = lyrics.replace(/\r\n/g, '\n');
    lyrics = lyrics.replace(/(\[[^\]]+\])\s*(?=\[)/g, '$1\n'); 
    lyrics = lyrics.replace(/(\[[^\]]+\])\s*(?![\[\s])/g, '$1\n\n'); 
    lyrics = lyrics.replace(/\n{3,}/g, '\n\n');
    lyrics = lyrics.trim();
  }

  const seo = result.seoMetadata || {};

  return {
    lyrics: lyrics,
    translation: ensureString(result.translation),
    stylePrompts: ensureStringArray(result.stylePrompts),
    imagePrompt: ensureString(result.imagePrompt),
    characterDescription: ensureString(result.characterDescription || inputs.characterDescription),
    textOverlayInstructions: ensureString(result.textOverlayInstructions),
    basePrompt: ensureString(result.basePrompt),
    seoMetadata: {
      titles: ensureStringArray(seo.titles),
      description: ensureString(seo.description),
      tags: ensureString(seo.tags),
      pinnedComment: ensureString(seo.pinnedComment),
      shorts: {
        title: ensureString(seo.shorts?.title),
        description: ensureString(seo.shorts?.description),
        tags: ensureString(seo.shorts?.tags),
      }
    },
    visualAssets: {
      scenes: (result.visualAssets?.scenes || []).map((s: any) => ({
        id: ensureString(s.id),
        lyricsSnippet: ensureString(s.lyricsSnippet),
        imagePrompt: ensureString(s.imagePrompt),
        videoPrompts: ensureStringArray(s.videoPrompts),
      }))
    }
  };
}
