import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

const useSmartSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [history, setHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // Load history on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('search_history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save history
    const addToHistory = (term) => {
        if (!term.trim()) return;
        const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 5); // Keep last 5
        setHistory(newHistory);
        localStorage.setItem('search_history', JSON.stringify(newHistory));
    };

    // Debounced Search Effect
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 1) {
                setIsSearching(true);
                try {
                    const data = await api.searchProducts(query);
                    setResults(data);
                } catch (err) {
                    console.error(err);
                    setResults([]);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setResults([]);
            }
        }, 400); // 400ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    // Load trending/suggestions if query is empty
    useEffect(() => {
        if (query === '') {
            api.getTrending().then(data => setSuggestions(data));
        }
    }, [query]);

    return {
        query,
        setQuery,
        results,
        isSearching,
        history,
        addToHistory,
        suggestions,
        clearHistory: () => {
            setHistory([]);
            localStorage.removeItem('search_history');
        }
    };
};

export default useSmartSearch;
