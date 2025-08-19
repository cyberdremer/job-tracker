SELECT 1 - (r.embedding <=> j.embedding) AS similarity_score
FROM "Resume" r 
JOIN "JobEntry" j on j.id = $1
WHERE r.id = $2