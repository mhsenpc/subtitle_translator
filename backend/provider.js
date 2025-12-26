const MODEL_NAME = '@cf/meta/m2m100-1.2b';

export async function translate(env, text, targetLang, sourceLang = 'english') {
    const response = await env.AI.run(
        MODEL_NAME,
        {
            text: text,
            source_lang: sourceLang,
            target_lang: targetLang,
        }
    );
    return {
        translated_text: response.translated_text,
        tokens: response.usage.total_tokens
    };
}
