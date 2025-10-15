SELECT
    j.id,
    j.title,
    j.location,
    j.location,
    j.salary,
    j.company
    1 - (j.embedding <=> r.embedding) as cosine_similarity
FROM "JobEntry" j
JOIN "Resume" r on r.id=$1
ORDER BY j.embedding <=> r.embedding ASC
LIMIT $2