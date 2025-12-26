const MODEL_NAME = '@cf/meta/m2m100-1.2b';

export default {
    async fetch(request, env) {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: corsHeaders
            });
        }

        let data;
        try {
            data = await request.json();
        } catch (err) {
            return Response.json({ error: 'Invalid JSON request body' }, { status: 400, headers: corsHeaders });
        }

        const textToTranslate = data.input;
        const targetLanguage = data.target_language;

        if (!textToTranslate || !targetLanguage) {
            return Response.json({ error: 'Missing input or target language' }, { status: 400, headers: corsHeaders });
        }

        const dbRequest = {
            input: textToTranslate,
            target_language: targetLanguage,
            created_at: new Date().toISOString(),
            status: 'pending'
        };
        // todo: store the request in database.

        try {
            const response = await env.AI.run(
                MODEL_NAME,
                {
                    text: textToTranslate,
                    source_lang: "english", // defaults to english
                    target_lang: targetLanguage,
                }
            );


            // todo: update the request in database. set status=sucess, response=response.response, tokens=response.usage.total_tokens
            return Response.json(
                {
                    response: response.translated_text,
                    tokens: response.usage.total_tokens
                },
                {
                    headers: corsHeaders
                }
            );
        } catch (err) {
            return Response.json({ error: 'Translation failed', details: err.message }, { status: 500, headers: corsHeaders });
        }
    }
};