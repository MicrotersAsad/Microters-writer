import React, { useState, useEffect } from 'react';
import setting from "../assest/setting.png";
import { Spinner } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ReactLanguageSelect from 'react-languages-select';
 
//import css module
import 'react-languages-select/css/react-languages-select.css';

const Home = ({ textColor }) => {
    const [apiKey, setApiKey] = useState("");
    const [keyWord, setKeyWord] = useState("");
    const [streamingText, setStreamingText] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [word, setWord] = useState(0);
    const [generatedResponse, setGeneratedResponse] = useState(null); 
    const [language, setLanguage] = useState(''); 
    const [currentWordIndex, setCurrentWordIndex] = useState(0); 
    

    useEffect(() => {
        setError(null); 
    }, []);

    const handelApiKey = (e) => {
        setApiKey(e.target.value);
    };
    
    const handelLangugae = (languageCode) => {
        setLanguage(languageCode);
    };
    
    const handelKeyword = (e) => {
        setKeyWord(e.target.value);
    };
    
    const handelWord = (e) => {
        setWord(e.target.value);
    };

    const generateAndStreamText = async () => {
        setLoading(true);
        setShowForm(false);
        
        // Adjusting the prompt to include language and word count
        const prompt = `Write a blog with proper HTML headings. First, Write an SEO Optimized Heading with h1.
         Then Write the introduction in 2 paragraphs.
          Then start with h2 headings. Each H2 Headings 3 paragraphs.
           Then if needed also add h3 headings. Then,. Article Keyword: ${keyWord} , Article Language: ${language}, Article Word: ${word}`;
    
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo-16k",
                    messages: [
                        { "role": "system", "content": `${prompt}` },
                        { "role": "user", "content": `${keyWord},${language},${word}` }
                    ],
                    "temperature": 1,
                    "max_tokens": 4500,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                })
            });
    
            const { choices } = await response.json();
            if (choices && choices.length > 0 && choices[0].message && choices[0].message.content) {
                const generatedText = choices[0].message.content.trim();
                const words = generatedText.split(/\s+/);
                setGeneratedResponse(generatedText);
                setStreamingText(words);
            } else {
                setError('Error generating text. Please try again.');
            }
        } catch (error) {
            setError('Error generating text. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex(prevIndex => {
                if (prevIndex < streamingText.length) {
                    return prevIndex + 1;
                } else {
                    clearInterval(interval);
                    return prevIndex;
                }
            });
        }, 100); 

        return () => clearInterval(interval);
    }, [streamingText]);

    const copyHtmlCode = () => {
        navigator.clipboard.writeText(generatedResponse);
        toast.success("HTML Code Copied Successfully");
    };

    const copyPlainText = () => {
        navigator.clipboard.writeText(streamingText.slice(0, currentWordIndex).join(' '));
        toast.success("Plain Text Copied Successfully");
    };
    
    const resetForm = () => {
        setApiKey("");
        setKeyWord("");
        setShowForm(true);
        setGeneratedResponse(null);
        setStreamingText([]);
        setCurrentWordIndex(0);
        setLanguage("");
        setLoading(false);
        setError(null);
    };

    return (
        <div className={`container p-5 `}>
            <h1 className="text-center fw-bold">Micro Writer</h1>
            <h6 className="text-center">
                Generate Unlimited SEO-Optimized Articles powered by your OpenAI API Key
            </h6>
            <div className="text-center m-4">
                <span className="bg-light rounded-pill p-3 ">
                    <a className="text-decoration-none" href="">
                        Follow Linkedin
                    </a>
                </span>
            </div>
            <div className="w-100 form-container">
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : showForm ? (
                    <div className="shadow rounded p-5 ">
                        <form className="w-100">
                            <div className="mb-3">
                                <h6>
                                    API Key
                                </h6>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    value={apiKey}
                                    onChange={handelApiKey}
                                    placeholder="Your OpenAI APIKEY"
                                    required
                                />
                                <div id="emailHelp" className="form-text">
                                    Get your API Key from{" "}
                                    <a href="https://openai.com/">OpenAI</a>. By entering your
                                    API Key, you agree to be responsible for any API charges you
                                    incur for OpenAI usage. Approximately $0.01 per article
                                    generated.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Target Keyword</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={keyWord}
                                    onChange={handelKeyword}
                                    placeholder="Enter Your Target Keyword"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mt-3 w-100 ">
                                <label>Choose Your Language</label>
                                <div className='border'>
                                    <ReactLanguageSelect 
                                        names={"international"}
                                        onSelect={handelLangugae}
                                    />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label>Suggested Word Count</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={word}
                                    onChange={handelWord}
                                    placeholder="Enter Your Target Keyword"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary mt-3"
                                onClick={generateAndStreamText}
                            >
                                Generate Article
                            </button>
                            {error && <div className="text-danger mt-2">{error}</div>}
                        </form>
                    </div>
                ) : (
                    <div>
                        <h3>Streaming Real-Time Results:</h3>
                        <CKEditor 
                            editor={ClassicEditor}
                            data={streamingText.slice(0, currentWordIndex).join(" ")}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                            }}
                        />
                        <ToastContainer />
                        {generatedResponse && (
                            <>
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={copyHtmlCode}
                                >
                                    Copy HTML Code
                                </button>
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={copyPlainText}
                                >
                                    Copy Plain Text
                                </button>
                                <button className="btn btn-danger m-2" onClick={resetForm}>
                                    Reset Form
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
