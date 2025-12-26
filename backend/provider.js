const MODEL_NAME = '@cf/meta/m2m100-1.2b';

export async function translate(env, text, targetLang, sourceLang = 'english') {
    return await env.AI.run(
        MODEL_NAME,
        {
            text: text,
            source_lang: sourceLang,
            target_lang: targetLang,
        }
    );
}
